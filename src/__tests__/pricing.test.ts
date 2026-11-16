import { describe, it, expect } from 'vitest';
import { seatPrice, mealPrice, passengerTotal, grandTotal, formatPrice } from '../utils/pricing';
import type { Seat, Passenger } from '../types';

const mockSeats: Seat[] = [
  { id: '1A', row: 1, col: 'A', category: 'standard', price: 0 },
  { id: '1B', row: 1, col: 'B', category: 'standard', price: 0 },
  { id: '1C', row: 1, col: 'C', category: 'extraLegroom', price: 350 },
  { id: '1D', row: 1, col: 'D', category: 'standard', price: 0 },
  { id: '1E', row: 1, col: 'E', category: 'premium', price: 250 },
  { id: '2A', row: 2, col: 'A', category: 'extraLegroom', price: 350 },
  { id: '2B', row: 2, col: 'B', category: 'standard', price: 0 },
];

describe('pricing utilities', () => {
  describe('seatPrice', () => {
    it('should return the correct price for a seat', () => {
      expect(seatPrice('1C', mockSeats)).toBe(350);
      expect(seatPrice('1E', mockSeats)).toBe(250);
    });

    it('should return 0 for free seats', () => {
      expect(seatPrice('1A', mockSeats)).toBe(0);
      expect(seatPrice('1B', mockSeats)).toBe(0);
    });

    it('should return 0 for unknown seat', () => {
      expect(seatPrice('99Z', mockSeats)).toBe(0);
    });
  });

  describe('mealPrice', () => {
    it('should return 0 for null meal', () => {
      expect(mealPrice(null)).toBe(0);
    });

    it('should return 0 for free meals', () => {
      expect(mealPrice('meal-1')).toBe(0);
    });

    it('should return correct price for paid meals', () => {
      expect(mealPrice('meal-3')).toBe(350);
      expect(mealPrice('meal-4')).toBe(450);
    });
  });

  describe('passengerTotal', () => {
    it('should return 0 for passenger with no seat and no meal', () => {
      const p: Passenger = { id: 1, name: 'P1', seatId: null, mealId: null };
      expect(passengerTotal(p, mockSeats)).toBe(0);
    });

    it('should return seat price for passenger with seat only', () => {
      const p: Passenger = { id: 1, name: 'P1', seatId: '1C', mealId: null };
      expect(passengerTotal(p, mockSeats)).toBe(350);
    });

    it('should return sum of seat and meal price', () => {
      const p: Passenger = { id: 1, name: 'P1', seatId: '1E', mealId: 'meal-3' };
      expect(passengerTotal(p, mockSeats)).toBe(250 + 350);
    });
  });

  describe('grandTotal', () => {
    it('should return 0 for passengers with no selections', () => {
      const passengers: Passenger[] = [
        { id: 1, name: 'P1', seatId: null, mealId: null },
        { id: 2, name: 'P2', seatId: null, mealId: null },
      ];
      expect(grandTotal(passengers, mockSeats)).toBe(0);
    });

    it('should sum all passenger totals', () => {
      const passengers: Passenger[] = [
        { id: 1, name: 'P1', seatId: '1C', mealId: null },    // 350
        { id: 2, name: 'P2', seatId: '1E', mealId: 'meal-3' }, // 250 + 350
        { id: 3, name: 'P3', seatId: '1A', mealId: null },     // 0
      ];
      expect(grandTotal(passengers, mockSeats)).toBe(350 + 250 + 350 + 0);
    });

    it('should update when seats change', () => {
      const passengers1: Passenger[] = [
        { id: 1, name: 'P1', seatId: '1C', mealId: null }, // 350
      ];
      expect(grandTotal(passengers1, mockSeats)).toBe(350);

      const passengers2: Passenger[] = [
        { id: 1, name: 'P1', seatId: '1A', mealId: null }, // 0
      ];
      expect(grandTotal(passengers2, mockSeats)).toBe(0);
    });
  });

  describe('formatPrice', () => {
    it('should format with Indian locale', () => {
      const formatted = formatPrice(1500);
      expect(formatted).toContain('1,500');
    });

    it('should format zero', () => {
      const formatted = formatPrice(0);
      expect(formatted).toContain('0');
    });
  });
});
