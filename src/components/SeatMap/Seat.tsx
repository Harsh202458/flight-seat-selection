import { useState, useRef, useEffect } from 'react';
import type { Seat as SeatType, SeatStatus, Passenger } from '../../types';
import './Seat.css';

interface SeatProps {
  seat: SeatType;
  status: SeatStatus;
  assignedPassenger?: Passenger;
  onSelect: (seatId: string) => void;
}

export function Seat({ seat, status, assignedPassenger, onSelect }: SeatProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    tooltipTimeout.current = setTimeout(() => setShowTooltip(true), 300);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, []);

  const isDisabled = status === 'occupied';
  const categoryClass = `seat--${seat.category}`;
  const statusClass = `seat--${status}`;

  const getInitials = (passenger: Passenger) => {
    return `P${passenger.id}`;
  };

  const getLabel = () => {
    if (status === 'occupied') return '✕';
    if (status === 'selectedByActive') return '✓';
    if (status === 'selectedByOther' && assignedPassenger) return getInitials(assignedPassenger);
    if (seat.price === 0) return seat.col;
    return seat.col;
  };

  const categoryLabel =
    seat.category === 'extraLegroom'
      ? 'Extra Legroom'
      : seat.category.charAt(0).toUpperCase() + seat.category.slice(1);

  const priceLabel = seat.price === 0 ? 'Free' : `₹${seat.price}`;

  return (
    <div className="seat-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={`seat ${categoryClass} ${statusClass}`}
        onClick={() => onSelect(seat.id)}
        disabled={isDisabled}
        aria-label={`Seat ${seat.id}, ${categoryLabel}, ${priceLabel}, ${status}`}
        aria-disabled={isDisabled}
        title={`${seat.id} · ${categoryLabel} · ${priceLabel}`}
      >
        <span className="seat__label">{getLabel()}</span>
      </button>
      {showTooltip && (
        <div className="seat__tooltip" role="tooltip">
          <div className="seat__tooltip-id">{seat.id}</div>
          <div className="seat__tooltip-cat">{categoryLabel}</div>
          <div className="seat__tooltip-price">{priceLabel}</div>
        </div>
      )}
    </div>
  );
}
