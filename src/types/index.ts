// ──────────────────────────────────────────
// Types for Flight Seat Selection App
// ──────────────────────────────────────────

export type SeatCategory = 'standard' | 'extraLegroom' | 'premium';

export interface Seat {
  id: string;        // e.g. "1A"
  row: number;
  col: string;       // e.g. "A", "B", "D"
  category: SeatCategory;
  price: number;
}

export interface Passenger {
  id: number;
  name: string;
  seatId: string | null;
  mealId: string | null;
}

export interface LayoutGroup {
  columns: string[];
}

export interface LayoutConfig {
  id: string;
  name: string;
  groups: LayoutGroup[];    // e.g. [{columns:["A","B","C"]}, {columns:["D","E"]}]
  totalRows: number;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
}

export type SeatStatus = 'available' | 'occupied' | 'selectedByActive' | 'selectedByOther';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'error' | 'info' | 'success';
}
