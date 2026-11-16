import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import type { Seat, Passenger, ToastMessage } from '../types';
import {
  bookingReducer,
  validateAssignment,
  type BookingState,
  type BookingAction,
  type AssignError,
} from './bookingReducer';
import { generateSeats, getOccupiedSeats, layouts } from '../data';
import { meals } from '../data/meals';

// ──────────────────────────────────────────
// Context value
// ──────────────────────────────────────────
interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  setPassengerCount: (count: number) => void;
  setActivePassenger: (id: number | null) => void;
  assignSeat: (passengerId: number, seatId: string) => AssignError | null;
  removeSeat: (passengerId: number) => void;
  switchLayout: (layoutId: string) => void;
  setMeal: (passengerId: number, mealId: string | null) => void;
  addToast: (text: string, type: ToastMessage['type']) => void;
  retryLoadSeats: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

// ──────────────────────────────────────────
// Initial state
// ──────────────────────────────────────────
const defaultLayout = layouts[0];

const initialState: BookingState = {
  passengerCount: 1,
  passengers: [{ id: 1, name: 'Passenger 1', seatId: null, mealId: null }],
  activePassengerId: 1,
  layoutType: defaultLayout.id,
  layouts,
  seats: [],
  occupiedSeats: new Set(),
  toasts: [],
  isLoading: true,
  error: null,
};

// ──────────────────────────────────────────
// Simulate async seat loading
// ──────────────────────────────────────────
function simulateLoadSeats(layoutId: string): Promise<{ seats: Seat[]; occupiedSeats: Set<string> }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const layout = layouts.find((l) => l.id === layoutId) ?? defaultLayout;
      resolve({
        seats: generateSeats(layout),
        occupiedSeats: getOccupiedSeats(layoutId),
      });
    }, 600);
  });
}

// ──────────────────────────────────────────
// Provider
// ──────────────────────────────────────────
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const toastIdRef = useRef(0);

  // Load seats on mount and layout change
  const loadSeats = useCallback(
    async (layoutId: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await simulateLoadSeats(layoutId);
        dispatch({ type: 'LOAD_SEATS', payload: data });
      } catch {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load seat data. Please try again.' });
      }
    },
    []
  );

  useEffect(() => {
    loadSeats(state.layoutType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToast = useCallback((text: string, type: ToastMessage['type']) => {
    const id = ++toastIdRef.current;
    dispatch({ type: 'ADD_TOAST', payload: { id, text, type } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, 3000);
  }, []);

  const setPassengerCount = useCallback((count: number) => {
    dispatch({ type: 'SET_PASSENGER_COUNT', payload: count });
  }, []);

  const setActivePassenger = useCallback((id: number | null) => {
    dispatch({ type: 'SET_ACTIVE_PASSENGER', payload: id });
  }, []);

  const assignSeat = useCallback(
    (passengerId: number, seatId: string): AssignError | null => {
      const result = validateAssignment(state, passengerId, seatId);
      if (!result.success) {
        const messages: Record<AssignError, string> = {
          SEAT_OCCUPIED: 'This seat is already occupied by another traveler.',
          SEAT_TAKEN_BY_OTHER: 'This seat is already assigned to another passenger in your group.',
          NO_ACTIVE_PASSENGER: 'Please select a passenger first.',
          PASSENGER_NOT_FOUND: 'Passenger not found.',
          SEAT_NOT_FOUND: 'Seat not found.',
        };
        addToast(messages[result.error!], 'error');
        return result.error!;
      }
      dispatch({ type: 'ASSIGN_SEAT', payload: { passengerId, seatId } });
      const seat = state.seats.find((s) => s.id === seatId);
      const priceText = seat && seat.price > 0 ? ` (₹${seat.price})` : ' (Free)';
      addToast(`Seat ${seatId}${priceText} assigned successfully!`, 'success');
      return null;
    },
    [state, addToast]
  );

  const removeSeat = useCallback(
    (passengerId: number) => {
      const passenger = state.passengers.find((p: Passenger) => p.id === passengerId);
      if (passenger?.seatId) {
        dispatch({ type: 'REMOVE_SEAT', payload: { passengerId } });
        addToast(`Seat ${passenger.seatId} removed.`, 'info');
      }
    },
    [state.passengers, addToast]
  );

  const switchLayout = useCallback(
    (layoutId: string) => {
      const layout = layouts.find((l) => l.id === layoutId);
      if (!layout) return;
      const seats = generateSeats(layout);
      const occupiedSeats = getOccupiedSeats(layoutId);
      dispatch({ type: 'SET_LAYOUT', payload: { layoutId, seats, occupiedSeats } });
      addToast(`Switched to ${layout.name}. Seat assignments cleared.`, 'info');
    },
    [addToast]
  );

  const setMeal = useCallback(
    (passengerId: number, mealId: string | null) => {
      dispatch({ type: 'SET_MEAL', payload: { passengerId, mealId } });
      if (mealId) {
        const meal = meals.find((m) => m.id === mealId);
        if (meal) {
          addToast(`${meal.name} selected.`, 'success');
        }
      }
    },
    [addToast]
  );

  const retryLoadSeats = useCallback(() => {
    loadSeats(state.layoutType);
  }, [loadSeats, state.layoutType]);

  const value: BookingContextValue = {
    state,
    dispatch,
    setPassengerCount,
    setActivePassenger,
    assignSeat,
    removeSeat,
    switchLayout,
    setMeal,
    addToast,
    retryLoadSeats,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// ──────────────────────────────────────────
// Hook
// ──────────────────────────────────────────
export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
