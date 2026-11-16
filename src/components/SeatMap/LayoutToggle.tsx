import { useBooking } from '../../context';
import './LayoutToggle.css';

export function LayoutToggle() {
  const { state, switchLayout } = useBooking();

  return (
    <div className="layout-toggle">
      {state.layouts.map((layout) => (
        <button
          key={layout.id}
          className={`layout-toggle__btn ${
            state.layoutType === layout.id ? 'layout-toggle__btn--active' : ''
          }`}
          onClick={() => switchLayout(layout.id)}
          aria-pressed={state.layoutType === layout.id}
          aria-label={`Switch to ${layout.name}`}
        >
          {layout.id}
        </button>
      ))}
    </div>
  );
}
