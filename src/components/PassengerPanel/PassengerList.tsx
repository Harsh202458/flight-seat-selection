import { useBooking } from '../../context';
import { PassengerCard } from './PassengerCard';
import './PassengerList.css';

export function PassengerList() {
  const { state } = useBooking();

  if (state.passengerCount === 0) {
    return (
      <div className="passenger-list__empty">
        <div className="passenger-list__empty-icon">👥</div>
        <p>Select the number of passengers to get started.</p>
      </div>
    );
  }

  return (
    <div className="passenger-list">
      {state.passengers.map((passenger) => (
        <PassengerCard
          key={passenger.id}
          passenger={passenger}
          isActive={state.activePassengerId === passenger.id}
        />
      ))}
    </div>
  );
}
