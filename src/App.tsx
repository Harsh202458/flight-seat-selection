import { BookingProvider } from './context';
import { SeatMap } from './components/SeatMap';
import { PassengerCountSelector, PassengerList } from './components/PassengerPanel';
import { PriceSummary } from './components/PriceSummary';
import { ToastContainer } from './components/common';
import { MobileTotal } from './components/Layout/MobileTotal';
import './App.css';

function App() {
  return (
    <BookingProvider>
      <div className="app">
        <header className="app__header">
          <div className="app__header-content">
            <h1 className="app__title">
              <span className="app__title-icon">✈️</span>
              Seat Selection
            </h1>
            <p className="app__subtitle">Choose your perfect seats</p>
          </div>
        </header>

        <main className="app__main">
          <div className="app__seat-section">
            <SeatMap />
          </div>

          <div className="app__sidebar">
            <div className="app__panel">
              <h2 className="app__panel-title">Passengers</h2>
              <PassengerCountSelector />
              <PassengerList />
            </div>

            <PriceSummary />
          </div>
        </main>

        <ToastContainer />
        <MobileTotal />
      </div>
    </BookingProvider>
  );
}

export default App;
