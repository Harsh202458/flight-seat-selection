import type { Seat as SeatType, LayoutGroup, Passenger, SeatStatus } from '../../types';
import { Seat } from './Seat';
import './SeatRow.css';

interface SeatRowProps {
  rowNumber: number;
  groups: LayoutGroup[];
  seats: SeatType[];
  getSeatStatus: (seatId: string) => SeatStatus;
  getAssignedPassenger: (seatId: string) => Passenger | undefined;
  onSelectSeat: (seatId: string) => void;
}

export function SeatRow({
  rowNumber,
  groups,
  seats,
  getSeatStatus,
  getAssignedPassenger,
  onSelectSeat,
}: SeatRowProps) {
  const rowSeats = seats.filter((s) => s.row === rowNumber);

  return (
    <div className="seat-row">
      <span className="seat-row__number">{rowNumber}</span>
      <div className="seat-row__groups">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="seat-row__group">
            {group.columns.map((col) => {
              const seat = rowSeats.find((s) => s.col === col);
              if (!seat) return <div key={col} className="seat-row__empty-slot" />;
              const status = getSeatStatus(seat.id);
              const assignedPassenger = getAssignedPassenger(seat.id);
              return (
                <Seat
                  key={seat.id}
                  seat={seat}
                  status={status}
                  assignedPassenger={assignedPassenger}
                  onSelect={onSelectSeat}
                />
              );
            })}
          </div>
        ))}
      </div>
      <span className="seat-row__number seat-row__number--right">{rowNumber}</span>
    </div>
  );
}
