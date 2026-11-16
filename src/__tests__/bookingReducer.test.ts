import { describe, it, expect } from 'vitest';
import { bookingReducer, validateAssignment, type BookingState } from '../context/bookingReducer';
import { generateSeats } from '../data/seats';
import { layout32, layout232 } from '../data/layouts';

// Helper: create a test state
function createTestState(overrides: Partial<BookingState> = {}): BookingState {
  const seats = generateSeats(layout32);
  return {
    passengerCount: 3,
    passengers: [
      { id: 1, name: 'Passenger 1', seatId: null, mealId: null },
      { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
      { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
    ],
    activePassengerId: 1,
    layoutType: '3-2',
    layouts: [layout32, layout232],
    seats,
    occupiedSeats: new Set(['1C', '2A']),
    toasts: [],
    isLoading: false,
    error: null,
    ...overrides,
  };
}

describe('bookingReducer', () => {
  // ─── SET_PASSENGER_COUNT ───
  describe('SET_PASSENGER_COUNT', () => {
    it('should increase passenger count', () => {
      const state = createTestState({ passengerCount: 1, passengers: [{ id: 1, name: 'Passenger 1', seatId: null, mealId: null }] });
      const next = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: 3 });
      expect(next.passengerCount).toBe(3);
      expect(next.passengers).toHaveLength(3);
    });

    it('should keep existing assignments when increasing count', () => {
      const state = createTestState({
        passengerCount: 1,
        passengers: [{ id: 1, name: 'Passenger 1', seatId: '1A', mealId: null }],
      });
      const next = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: 2 });
      expect(next.passengers[0].seatId).toBe('1A');
      expect(next.passengers[1].seatId).toBeNull();
    });

    it('should drop assignments when reducing count below assigned passengers', () => {
      const state = createTestState({
        passengerCount: 3,
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
          { id: 2, name: 'Passenger 2', seatId: '1B', mealId: null },
          { id: 3, name: 'Passenger 3', seatId: '1D', mealId: null },
        ],
        activePassengerId: 3,
      });
      const next = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: 1 });
      expect(next.passengerCount).toBe(1);
      expect(next.passengers).toHaveLength(1);
      expect(next.passengers[0].seatId).toBe('1A');
    });

    it('should clamp to 0-9 range', () => {
      const state = createTestState();
      const tooLow = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: -5 });
      expect(tooLow.passengerCount).toBe(0);

      const tooHigh = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: 20 });
      expect(tooHigh.passengerCount).toBe(9);
    });

    it('should reset activePassengerId if it exceeds new count', () => {
      const state = createTestState({ activePassengerId: 3 });
      const next = bookingReducer(state, { type: 'SET_PASSENGER_COUNT', payload: 2 });
      expect(next.activePassengerId).toBe(1);
    });
  });

  // ─── ASSIGN_SEAT ───
  describe('ASSIGN_SEAT', () => {
    it('should assign a seat to a passenger', () => {
      const state = createTestState();
      const next = bookingReducer(state, {
        type: 'ASSIGN_SEAT',
        payload: { passengerId: 1, seatId: '1A' },
      });
      expect(next.passengers[0].seatId).toBe('1A');
    });

    it('should reject occupied seats (state unchanged)', () => {
      const state = createTestState(); // 1C is occupied
      const next = bookingReducer(state, {
        type: 'ASSIGN_SEAT',
        payload: { passengerId: 1, seatId: '1C' },
      });
      expect(next.passengers[0].seatId).toBeNull();
    });

    it('should reject double-booking (same seat to two passengers)', () => {
      const state = createTestState({
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
          { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
          { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
        ],
      });
      const next = bookingReducer(state, {
        type: 'ASSIGN_SEAT',
        payload: { passengerId: 2, seatId: '1A' },
      });
      // Should be rejected
      expect(next.passengers[1].seatId).toBeNull();
      expect(next.passengers[0].seatId).toBe('1A');
    });

    it('should free old seat when reassigning', () => {
      const state = createTestState({
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
          { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
          { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
        ],
      });
      const next = bookingReducer(state, {
        type: 'ASSIGN_SEAT',
        payload: { passengerId: 1, seatId: '1B' },
      });
      expect(next.passengers[0].seatId).toBe('1B');
      // Old seat is free now - another passenger can take it
      const next2 = bookingReducer(next, {
        type: 'ASSIGN_SEAT',
        payload: { passengerId: 2, seatId: '1A' },
      });
      expect(next2.passengers[1].seatId).toBe('1A');
    });
  });

  // ─── REMOVE_SEAT ───
  describe('REMOVE_SEAT', () => {
    it('should remove a seat assignment', () => {
      const state = createTestState({
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
          { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
          { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
        ],
      });
      const next = bookingReducer(state, { type: 'REMOVE_SEAT', payload: { passengerId: 1 } });
      expect(next.passengers[0].seatId).toBeNull();
    });
  });

  // ─── SET_LAYOUT ───
  describe('SET_LAYOUT', () => {
    it('should clear all seat assignments when switching layout', () => {
      const state = createTestState({
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
          { id: 2, name: 'Passenger 2', seatId: '1B', mealId: null },
          { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
        ],
      });
      const newSeats = generateSeats(layout232);
      const next = bookingReducer(state, {
        type: 'SET_LAYOUT',
        payload: { layoutId: '2-3-2', seats: newSeats, occupiedSeats: new Set(['1B', '2D']) },
      });
      expect(next.layoutType).toBe('2-3-2');
      expect(next.passengers.every((p) => p.seatId === null)).toBe(true);
    });
  });

  // ─── SET_MEAL ───
  describe('SET_MEAL', () => {
    it('should assign a meal to a passenger', () => {
      const state = createTestState();
      const next = bookingReducer(state, {
        type: 'SET_MEAL',
        payload: { passengerId: 1, mealId: 'meal-3' },
      });
      expect(next.passengers[0].mealId).toBe('meal-3');
    });

    it('should clear a meal', () => {
      const state = createTestState({
        passengers: [
          { id: 1, name: 'Passenger 1', seatId: null, mealId: 'meal-3' },
          { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
          { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
        ],
      });
      const next = bookingReducer(state, {
        type: 'SET_MEAL',
        payload: { passengerId: 1, mealId: null },
      });
      expect(next.passengers[0].mealId).toBeNull();
    });
  });
});

// ─── validateAssignment ───
describe('validateAssignment', () => {
  it('should return SEAT_OCCUPIED for occupied seats', () => {
    const state = createTestState();
    const result = validateAssignment(state, 1, '1C');
    expect(result.success).toBe(false);
    expect(result.error).toBe('SEAT_OCCUPIED');
  });

  it('should return SEAT_TAKEN_BY_OTHER when seat is assigned to another passenger', () => {
    const state = createTestState({
      passengers: [
        { id: 1, name: 'Passenger 1', seatId: '1A', mealId: null },
        { id: 2, name: 'Passenger 2', seatId: null, mealId: null },
        { id: 3, name: 'Passenger 3', seatId: null, mealId: null },
      ],
    });
    const result = validateAssignment(state, 2, '1A');
    expect(result.success).toBe(false);
    expect(result.error).toBe('SEAT_TAKEN_BY_OTHER');
  });

  it('should return PASSENGER_NOT_FOUND for invalid passenger id', () => {
    const state = createTestState();
    const result = validateAssignment(state, 999, '1A');
    expect(result.success).toBe(false);
    expect(result.error).toBe('PASSENGER_NOT_FOUND');
  });

  it('should succeed for valid assignment', () => {
    const state = createTestState();
    const result = validateAssignment(state, 1, '1A');
    expect(result.success).toBe(true);
  });
});
