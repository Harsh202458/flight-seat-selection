import './SeatLegend.css';

export function SeatLegend() {
  return (
    <div className="seat-legend">
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--available" />
        <span>Available</span>
      </div>
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--occupied" />
        <span>Occupied</span>
      </div>
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--selected" />
        <span>Your Pick</span>
      </div>
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--other" />
        <span>Other Passenger</span>
      </div>
      <div className="seat-legend__divider" />
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--standard" />
        <span>Standard</span>
      </div>
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--extra-legroom" />
        <span>Extra Legroom</span>
      </div>
      <div className="seat-legend__item">
        <div className="seat-legend__swatch seat-legend__swatch--premium" />
        <span>Premium</span>
      </div>
    </div>
  );
}
