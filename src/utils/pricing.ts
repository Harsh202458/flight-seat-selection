import type { Seat, Passenger } from '../types';
import { meals } from '../data/meals';

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return formatter.format(amount);
}

export function seatPrice(seatId: string, seats: Seat[]): number {
  const seat = seats.find((s) => s.id === seatId);
  return seat ? seat.price : 0;
}

export function mealPrice(mealId: string | null): number {
  if (!mealId) return 0;
  const meal = meals.find((m) => m.id === mealId);
  return meal ? meal.price : 0;
}

export function passengerTotal(passenger: Passenger, seats: Seat[]): number {
  const sPrice = passenger.seatId ? seatPrice(passenger.seatId, seats) : 0;
  const mPrice = mealPrice(passenger.mealId);
  return sPrice + mPrice;
}

export function grandTotal(passengers: Passenger[], seats: Seat[]): number {
  return passengers.reduce((sum, p) => sum + passengerTotal(p, seats), 0);
}
