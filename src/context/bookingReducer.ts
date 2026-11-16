import type { Passenger, Seat, LayoutConfig, ToastMessage } from '../types';

// ──────────────────────────────────────────
// State
// ──────────────────────────────────────────
export interface BookingState {
  passengerCount: number;
  passengers: Passenger[];
  activePassengerId: number | null;
  layoutType: string;
  layouts: LayoutConfig[];
  seats: Seat[];
  occupiedSeats: Set<string>;
  toasts: ToastMessage[];
  isLoading: boolean;
  error: string | null;
}

// ──────────────────────────────────────────
// Actions
// ──────────────────────────────────────────
export type BookingAction =
  | { type: 'SET_PASSENGER_COUNT'; payload: number }
  | { type: 'SET_ACTIVE_PASSENGER'; payload: number | null }
  | { type: 'ASSIGN_SEAT'; payload: { passengerId: number; seatId: string } }
  | { type: 'REMOVE_SEAT'; payload: { passengerId: number } }
  | { type: 'SET_LAYOUT'; payload: { layoutId: string; seats: Seat[]; occupiedSeats: Set<string> } }
  | { type: 'SET_MEAL'; payload: { passengerId: number; mealId: string | null } }
  | { type: 'ADD_TOAST'; payload: ToastMessage }
  | { type: 'REMOVE_TOAST'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_SEATS'; payload: { seats: Seat[]; occupiedSeats: Set<string> } };

// ──────────────────────────────────────────
// Error reasons for invalid assignment
// ──────────────────────────────────────────
export type AssignError =
  | 'SEAT_OCCUPIED'
  | 'SEAT_TAKEN_BY_OTHER'
  | 'NO_ACTIVE_PASSENGER'
  | 'PASSENGER_NOT_FOUND'
  | 'SEAT_NOT_FOUND';

export interface AssignResult {
  success: boolean;
  error?: AssignError;
}

// ──────────────────────────────────────────
// Helper: create passengers array
// ──────────────────────────────────────────
function createPassengers(count: number, existing: Passenger[]): Passenger[] {
  const passengers: Passenger[] = [];
  for (let i = 1; i <= count; i++) {
    const prev = existing.find((p) => p.id === i);
    passengers.push(
      prev
        ? { ...prev }
        : { id: i, name: `Passenger ${i}`, seatId: null, mealId: null }
    );
  }
  return passengers;
}

// ──────────────────────────────────────────
// Validate assignment (pure function)
// ──────────────────────────────────────────
export function validateAssignment(
  state: BookingState,
  passengerId: number,
  seatId: string
): AssignResult {
  const passenger = state.passengers.find((p) => p.id === passengerId);
  if (!passenger) return { success: false, error: 'PASSENGER_NOT_FOUND' };

  const seat = state.seats.find((s) => s.id === seatId);
  if (!seat) return { success: false, error: 'SEAT_NOT_FOUND' };

  if (state.occupiedSeats.has(seatId)) {
    return { success: false, error: 'SEAT_OCCUPIED' };
  }

  const otherPassenger = state.passengers.find(
    (p) => p.id !== passengerId && p.seatId === seatId
  );
  if (otherPassenger) {
    return { success: false, error: 'SEAT_TAKEN_BY_OTHER' };
  }

  return { success: true };
}

// ──────────────────────────────────────────
// Reducer
// ──────────────────────────────────────────
export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case 'SET_PASSENGER_COUNT': {
      const count = Math.max(0, Math.min(9, action.payload));
      const passengers = createPassengers(count, state.passengers);
      // If active passenger is beyond the new count, reset it
      const activePassengerId =
        state.activePassengerId && state.activePassengerId > count
          ? (count > 0 ? 1 : null)
          : state.activePassengerId;
      return { ...state, passengerCount: count, passengers, activePassengerId };
    }

    case 'SET_ACTIVE_PASSENGER': {
      return { ...state, activePassengerId: action.payload };
    }

    case 'ASSIGN_SEAT': {
      const { passengerId, seatId } = action.payload;
      const validation = validateAssignment(state, passengerId, seatId);
      if (!validation.success) {
        // Return state unchanged - the UI layer handles toast
        return state;
      }

      const passengers = state.passengers.map((p) => {
        if (p.id === passengerId) {
          // Reassign: free the old seat automatically
          return { ...p, seatId };
        }
        return p;
      });

      return { ...state, passengers };
    }

    case 'REMOVE_SEAT': {
      const passengers = state.passengers.map((p) =>
        p.id === action.payload.passengerId
          ? { ...p, seatId: null }
          : p
      );
      return { ...state, passengers };
    }

    case 'SET_LAYOUT': {
      const { layoutId, seats, occupiedSeats } = action.payload;
      // Clear all seat assignments when switching layout
      const passengers = state.passengers.map((p) => ({
        ...p,
        seatId: null,
      }));
      return {
        ...state,
        layoutType: layoutId,
        seats,
        occupiedSeats,
        passengers,
      };
    }

    case 'SET_MEAL': {
      const { passengerId, mealId } = action.payload;
      const passengers = state.passengers.map((p) =>
        p.id === passengerId ? { ...p, mealId } : p
      );
      return { ...state, passengers };
    }

    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    }

    case 'REMOVE_TOAST': {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    }

    case 'SET_LOADING': {
      return { ...state, isLoading: action.payload };
    }

    case 'SET_ERROR': {
      return { ...state, error: action.payload, isLoading: false };
    }

    case 'LOAD_SEATS': {
      return {
        ...state,
        seats: action.payload.seats,
        occupiedSeats: action.payload.occupiedSeats,
        isLoading: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
