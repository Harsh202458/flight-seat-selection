import { useBooking } from '../../context';
import './PassengerCountSelector.css';

export function PassengerCountSelector() {
  const { state, setPassengerCount } = useBooking();
  const { passengerCount } = state;

  const handleDecrement = () => {
    if (passengerCount > 0) setPassengerCount(passengerCount - 1);
  };

  const handleIncrement = () => {
    if (passengerCount < 9) setPassengerCount(passengerCount + 1);
  };

  return (
    <div className="passenger-count-selector">
      <label className="passenger-count-label">Passengers</label>
      <div className="stepper">
        <button
          className="stepper-btn"
          onClick={handleDecrement}
          disabled={passengerCount <= 0}
          aria-label="Decrease passenger count"
        >
          −
        </button>
        <span className="stepper-value" aria-live="polite">
          {passengerCount}
        </span>
        <button
          className="stepper-btn"
          onClick={handleIncrement}
          disabled={passengerCount >= 9}
          aria-label="Increase passenger count"
        >
          +
        </button>
      </div>
    </div>
  );
}
