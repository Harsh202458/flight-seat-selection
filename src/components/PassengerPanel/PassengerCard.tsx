import type { MouseEvent } from 'react';
import type { Passenger } from '../../types';
import { useBooking } from '../../context';
import { seatPrice, formatPrice, mealPrice } from '../../utils/pricing';
import { MealSelector } from '../MealSelector/MealSelector';
import './PassengerCard.css';

interface PassengerCardProps {
  passenger: Passenger;
  isActive: boolean;
}

export function PassengerCard({ passenger, isActive }: PassengerCardProps) {
  const { state, setActivePassenger, removeSeat } = useBooking();

  const seat = passenger.seatId
    ? state.seats.find((s) => s.id === passenger.seatId)
    : null;
  const price = seat ? seatPrice(seat.id, state.seats) : 0;
  const mPrice = mealPrice(passenger.mealId);

  const handleClick = () => {
    setActivePassenger(passenger.id);
  };

  const handleRemoveSeat = (e: MouseEvent) => {
    e.stopPropagation();
    removeSeat(passenger.id);
  };

  return (
    <div
      className={`passenger-card ${isActive ? 'passenger-card--active' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={isActive}
      aria-label={`Select ${passenger.name}`}
    >
      <div className="passenger-card__header">
        <div className="passenger-card__avatar">
          {passenger.name.charAt(passenger.name.length - 1)}
        </div>
        <div className="passenger-card__info">
          <span className="passenger-card__name">{passenger.name}</span>
          {seat ? (
            <div className="passenger-card__seat-info">
              <span className="passenger-card__seat-badge">
                Seat {seat.id}
              </span>
              <span className="passenger-card__seat-category">
                {seat.category === 'extraLegroom'
                  ? 'Extra Legroom'
                  : seat.category.charAt(0).toUpperCase() + seat.category.slice(1)}
              </span>
              <span className="passenger-card__price">
                {price === 0 ? 'Free' : formatPrice(price)}
              </span>
            </div>
          ) : (
            <span className="passenger-card__no-seat">No seat selected</span>
          )}
          {mPrice > 0 && (
            <span className="passenger-card__meal-price">
              Meal: {formatPrice(mPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="passenger-card__actions">
        {seat && (
          <button
            className="passenger-card__remove-btn"
            onClick={handleRemoveSeat}
            aria-label={`Remove seat ${seat.id} from ${passenger.name}`}
          >
            ✕
          </button>
        )}
      </div>
      {isActive && (
        <div className="passenger-card__meal-section">
          <MealSelector passengerId={passenger.id} selectedMealId={passenger.mealId} />
        </div>
      )}
    </div>
  );
}
