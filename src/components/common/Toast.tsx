import { useBooking } from '../../context';
import './Toast.css';

export function ToastContainer() {
  const { state, dispatch } = useBooking();

  if (state.toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {state.toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__icon">
            {toast.type === 'error' ? '❌' : toast.type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <span className="toast__text">{toast.text}</span>
          <button
            className="toast__close"
            onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
