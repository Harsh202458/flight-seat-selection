import { useBooking } from '../../context';
import { grandTotal } from '../../utils/pricing';
import { formatPrice } from '../../utils/pricing';
import './MobileTotal.css';

export function MobileTotal() {
  const { state } = useBooking();
  const total = grandTotal(state.passengers, state.seats);
  const seatCount = state.passengers.filter((p) => p.seatId).length;

  if (seatCount === 0) return null;

  return (
    <div className="mobile-total">
      <div className="mobile-total__info">
        <span className="mobile-total__count">{seatCount} seat{seatCount !== 1 ? 's' : ''} selected</span>
        <span className="mobile-total__amount">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
