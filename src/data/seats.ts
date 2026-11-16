import type { Seat, SeatCategory, LayoutConfig } from '../types';

// ──────────────────────────────────────────
// Pricing rules
// ──────────────────────────────────────────
// Rows 1-2:  Use the spec's sample prices exactly for matching seat IDs,
//            then extend the pattern.
// Row 1-2:   Standard = ₹0, Extra Legroom = ₹350, Premium = ₹250
// Rows 3-4:  Premium rows - all seats ₹250
// Rows 5-6:  Extra legroom rows - ₹350 per seat
// Rows 7-12: Standard rows - most ₹0, window seats ₹150

function getCategoryAndPrice(
  row: number,
  col: string,
  layoutId: string
): { category: SeatCategory; price: number } {
  // Rows 1-2: spec-defined sample data
  if (row === 1 || row === 2) {
    const seatId = `${row}${col}`;
    const specPrices: Record<string, { category: SeatCategory; price: number }> = {
      '1A': { category: 'standard', price: 0 },
      '1B': { category: 'standard', price: 0 },
      '1C': { category: 'extraLegroom', price: 350 },
      '1D': { category: 'standard', price: 0 },
      '1E': { category: 'premium', price: 250 },
      '2A': { category: 'extraLegroom', price: 350 },
      '2B': { category: 'standard', price: 0 },
    };
    if (specPrices[seatId]) return specPrices[seatId];
    // For 2-3-2 layout extra columns or unspecified seats in rows 1-2
    if (col === 'C' || col === 'F') return { category: 'extraLegroom', price: 350 };
    if (col === 'E' && layoutId === '2-3-2') return { category: 'premium', price: 250 };
    if (col === 'G' || col === 'H') return { category: 'standard', price: 0 };
    return { category: 'standard', price: 0 };
  }

  // Rows 3-4: Premium
  if (row === 3 || row === 4) {
    return { category: 'premium', price: 250 };
  }

  // Rows 5-6: Extra Legroom
  if (row === 5 || row === 6) {
    return { category: 'extraLegroom', price: 350 };
  }

  // Rows 7-12: Standard with window surcharge
  const firstCol = layoutId === '3-2' ? 'A' : 'A';
  const lastCol = layoutId === '3-2' ? 'E' : 'H';
  if (col === firstCol || col === lastCol) {
    return { category: 'standard', price: 150 };
  }
  return { category: 'standard', price: 0 };
}

export function generateSeats(layout: LayoutConfig): Seat[] {
  const seats: Seat[] = [];
  const allColumns = layout.groups.flatMap((g) => g.columns);

  for (let row = 1; row <= layout.totalRows; row++) {
    for (const col of allColumns) {
      const { category, price } = getCategoryAndPrice(row, col, layout.id);
      seats.push({
        id: `${row}${col}`,
        row,
        col,
        category,
        price,
      });
    }
  }

  return seats;
}

// ──────────────────────────────────────────
// Occupied seats (pre-booked by other passengers)
// ──────────────────────────────────────────
export const occupiedSeats32: Set<string> = new Set([
  '1C', '2A', '3B', '4D', '5A', '5E', '7C', '8B', '9D', '10A', '11E', '12C',
]);

export const occupiedSeats232: Set<string> = new Set([
  '1B', '2D', '3F', '4A', '5G', '6E', '7H', '8B', '9D', '10F', '11A', '12G',
]);

export function getOccupiedSeats(layoutId: string): Set<string> {
  return layoutId === '3-2' ? occupiedSeats32 : occupiedSeats232;
}
