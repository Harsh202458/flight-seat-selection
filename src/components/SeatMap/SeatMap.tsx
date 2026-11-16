import { useCallback, useMemo } from 'react';
import type { SeatStatus, Passenger } from '../../types';
import { useBooking } from '../../context';
import { SeatRow } from './SeatRow';
import { SeatLegend } from './SeatLegend';
import { LayoutToggle } from './LayoutToggle';
import './SeatMap.css';

export function SeatMap() {
  const { state, assignSeat, addToast } = useBooking();
  const currentLayout = state.layouts.find((l) => l.id === state.layoutType);

  const getSeatStatus = useCallback(
    (seatId: string): SeatStatus => {
      if (state.occupiedSeats.has(seatId)) return 'occupied';
      const assignedPassenger = state.passengers.find((p) => p.seatId === seatId);
      if (assignedPassenger) {
        return assignedPassenger.id === state.activePassengerId
          ? 'selectedByActive'
          : 'selectedByOther';
      }
      return 'available';
    },
    [state.occupiedSeats, state.passengers, state.activePassengerId]
  );

  const getAssignedPassenger = useCallback(
    (seatId: string): Passenger | undefined => {
      return state.passengers.find((p) => p.seatId === seatId);
    },
    [state.passengers]
  );

  const handleSelectSeat = useCallback(
    (seatId: string) => {
      if (!state.activePassengerId) {
        addToast('Please select a passenger first.', 'error');
        return;
      }
      assignSeat(state.activePassengerId, seatId);
    },
    [state.activePassengerId, assignSeat, addToast]
  );

  const rows = useMemo(() => {
    if (!currentLayout) return [];
    return Array.from({ length: currentLayout.totalRows }, (_, i) => i + 1);
  }, [currentLayout]);

  const columnLabels = useMemo(() => {
    if (!currentLayout) return [];
    return currentLayout.groups;
  }, [currentLayout]);

  if (state.isLoading) {
    return (
      <div className="seat-map">
        <LayoutToggle />
        <div className="seat-map__skeleton">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="seat-map__skeleton-row">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="seat-map__skeleton-seat" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="seat-map">
        <LayoutToggle />
        <div className="seat-map__error">
          <div className="seat-map__error-icon">⚠️</div>
          <p>{state.error}</p>
          <button className="seat-map__retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentLayout) return null;

  return (
    <div className="seat-map">
      <LayoutToggle />
      <SeatLegend />

      <div className="seat-map__aircraft">
        {/* Cockpit */}
        <div className="seat-map__cockpit">
          <div className="seat-map__cockpit-shape" />
        </div>

        {/* Column headers */}
        <div className="seat-map__col-headers">
          <span className="seat-map__col-spacer" />
          <div className="seat-map__col-groups">
            {columnLabels.map((group, idx) => (
              <div key={idx} className="seat-map__col-group">
                {group.columns.map((col) => (
                  <span key={col} className="seat-map__col-label">
                    {col}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <span className="seat-map__col-spacer" />
        </div>

        {/* Rows */}
        <div className="seat-map__rows">
          {rows.map((rowNum) => (
            <SeatRow
              key={rowNum}
              rowNumber={rowNum}
              groups={currentLayout.groups}
              seats={state.seats}
              getSeatStatus={getSeatStatus}
              getAssignedPassenger={getAssignedPassenger}
              onSelectSeat={handleSelectSeat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
