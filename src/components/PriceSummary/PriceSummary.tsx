import { useBooking } from '../../context';
import { seatPrice, formatPrice, mealPrice, grandTotal } from '../../utils/pricing';
import { meals } from '../../data/meals';
import './PriceSummary.css';

export function PriceSummary() {
  const { state } = useBooking();
  const total = grandTotal(state.passengers, state.seats);
  const hasAnySelection = state.passengers.some((p) => p.seatId || p.mealId);

  if (!hasAnySelection) {
    return (
      <div className="price-summary">
        <h3 className="price-summary__title">Price Summary</h3>
        <div className="price-summary__empty">
          <div className="price-summary__empty-icon">🎫</div>
          <p>No seats selected yet. Pick seats to see the breakdown.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="price-summary">
      <h3 className="price-summary__title">Price Summary</h3>
      <div className="price-summary__items">
        {state.passengers.map((passenger) => {
          const seat = passenger.seatId
            ? state.seats.find((s) => s.id === passenger.seatId)
            : null;
          const sPrice = seat ? seatPrice(seat.id, state.seats) : 0;
          const mPrice = mealPrice(passenger.mealId);
          const meal = passenger.mealId ? meals.find((m) => m.id === passenger.mealId) : null;

          if (!seat && !meal) return null;

          return (
            <div key={passenger.id} className="price-summary__passenger">
              <div className="price-summary__passenger-name">{passenger.name}</div>
              {seat && (
                <div className="price-summary__line">
                  <span className="price-summary__line-label">
                    Seat {seat.id}
                    <span className="price-summary__line-cat">
                      {seat.category === 'extraLegroom'
                        ? ' · Extra Legroom'
                        : seat.category === 'premium'
                        ? ' · Premium'
                        : ' · Standard'}
                    </span>
                  </span>
                  <span
                    className={`price-summary__line-price ${
                      sPrice === 0 ? 'price-summary__line-price--free' : ''
                    }`}
                  >
                    {sPrice === 0 ? 'Free' : formatPrice(sPrice)}
                  </span>
                </div>
              )}
              {meal && (
                <div className="price-summary__line">
                  <span className="price-summary__line-label">
                    {meal.name}
                    <span className="price-summary__line-cat"> · Meal</span>
                  </span>
                  <span
                    className={`price-summary__line-price ${
                      mPrice === 0 ? 'price-summary__line-price--free' : ''
                    }`}
                  >
                    {mPrice === 0 ? 'Free' : formatPrice(mPrice)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="price-summary__total">
        <span>Grand Total</span>
        <span className="price-summary__total-amount">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
