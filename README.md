# ✈️ Flight Seat Selection & Passenger Management

A modern, accessible, and responsive flight seat selection application built with **React 19**, **TypeScript**, and **Vite**. Features multi-passenger booking, dynamic aircraft layout configurations (3–2 and 2–3–2), real-time pricing and seat conflict resolution, interactive meal selection, and seamless mobile responsiveness.

---

## 🌐 Live Demo & Repository

- **Live URL**: `https://flight-seat-selection-demo.vercel.app` *(or import to your Vercel account via the steps below)*
- **GitHub Repository**: `https://github.com/<your-username>/flight-seat-selection`

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript (strict mode, zero type errors)
- **State Management**: React Context + `useReducer` for predictable, unidirectional state flow
- **Styling**: Modern Vanilla CSS with CSS custom properties, responsive flexbox/grid, and accessible focus styles
- **Testing**: Vitest with `@testing-library/react` and `@testing-library/jest-dom` (31 passing unit tests)
- **Formatting & Currency**: Native `Intl.NumberFormat('en-IN')` for Indian Rupee (`₹`) pricing

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Setup Commands

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/flight-seat-selection.git
cd flight-seat-selection

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run test suite
npm run test

# 5. Type-check and production build
npm run build
```

---

## 📂 Project Structure

```
flight-seat-selection/
├── public/                     # Static assets
├── src/
│   ├── __tests__/              # Unit tests (reducer, pricing, assignment logic)
│   │   ├── bookingReducer.test.ts
│   │   ├── pricing.test.ts
│   │   └── setup.ts
│   ├── components/
│   │   ├── common/             # Shared UI components (Toast notifications)
│   │   │   ├── Toast.tsx
│   │   │   ├── Toast.css
│   │   │   └── index.ts
│   │   ├── Layout/             # Global layout & responsive elements
│   │   │   ├── MobileTotal.tsx
│   │   │   └── MobileTotal.css
│   │   ├── MealSelector/       # Bonus meal selection component
│   │   │   ├── MealSelector.tsx
│   │   │   ├── MealSelector.css
│   │   │   └── index.ts
│   │   ├── PassengerPanel/     # Stepper, passenger list & cards
│   │   │   ├── PassengerCard.tsx
│   │   │   ├── PassengerCard.css
│   │   │   ├── PassengerCountSelector.tsx
│   │   │   ├── PassengerCountSelector.css
│   │   │   ├── PassengerList.tsx
│   │   │   ├── PassengerList.css
│   │   │   └── index.ts
│   │   ├── PriceSummary/       # Line-item pricing & grand total
│   │   │   ├── PriceSummary.tsx
│   │   │   ├── PriceSummary.css
│   │   │   └── index.ts
│   │   └── SeatMap/            # Config-driven aircraft seat map
│   │       ├── LayoutToggle.tsx
│   │       ├── LayoutToggle.css
│   │       ├── Seat.tsx
│   │       ├── Seat.css
│   │       ├── SeatLegend.tsx
│   │       ├── SeatLegend.css
│   │       ├── SeatMap.tsx
│   │       ├── SeatMap.css
│   │       ├── SeatRow.tsx
│   │       ├── SeatRow.css
│   │       └── index.ts
│   ├── context/                # Context + Reducer state management
│   │   ├── BookingContext.tsx
│   │   ├── bookingReducer.ts
│   │   └── index.ts
│   ├── data/                   # Mock data and layout definitions
│   │   ├── layouts.ts
│   │   ├── meals.ts
│   │   ├── seats.ts
│   │   └── index.ts
│   ├── types/                  # TypeScript interface declarations
│   │   └── index.ts
│   ├── utils/                  # Pure utility functions (pricing, currency formatters)
│   │   └── pricing.ts
│   ├── App.tsx                 # Root layout orchestration
│   ├── App.css
│   ├── main.tsx                # React DOM mount point
│   └── vite-env.d.ts
├── ASSIGNMENT.md               # Assessment specifications in Markdown
├── GEMINI.md                   # Project rules and architectural guidelines
├── index.html                  # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧠 State Management Explanation

### Why `useReducer` + React Context?

1. **Atomic & Predictable State Transitions**: Flight booking involves interdependent rules (reducing passenger count drops extraneous seat allocations, reassigning a seat immediately vacates the previous seat, switching layouts invalidates active selections). `useReducer` keeps all transition rules encapsulated in pure reducer functions.
2. **Zero External Overhead**: Eliminates the overhead, boilerplate, and dependency weight of Redux or Zustand while maintaining enterprise-grade testability and predictability.
3. **Strict Validation Pipeline**: Actions are validated before mutating state using a pure `validateAssignment` selector that returns typed error codes (`SEAT_OCCUPIED`, `SEAT_TAKEN_BY_OTHER`, `PASSENGER_NOT_FOUND`).

### State Shape (`BookingState`)

```typescript
interface BookingState {
  passengerCount: number;             // Stepper value (0–9)
  passengers: Passenger[];           // Array of { id, name, seatId, mealId }
  activePassengerId: number | null;  // Currently focused passenger
  layoutType: string;                // '3-2' | '2-3-2'
  layouts: LayoutConfig[];           // Available aircraft layouts
  seats: Seat[];                     // Dynamically generated seats for active layout
  occupiedSeats: Set<string>;        // Pre-booked seat IDs (unselectable)
  toasts: ToastMessage[];            // User feedback queue
  isLoading: boolean;                // Simulated async loading flag
  error: string | null;              // Error boundary / fetch failure state
}
```

### Action List (`BookingAction`)

| Action Type | Payload | Purpose |
|-------------|---------|---------|
| `SET_PASSENGER_COUNT` | `number` | Updates passenger count (1–9). Preserves existing assignments when increasing; cleanly drops seats for truncated passengers. |
| `SET_ACTIVE_PASSENGER` | `number \| null` | Changes the passenger currently being assigned seats or meals. |
| `ASSIGN_SEAT` | `{ passengerId, seatId }` | Reassigns seat; frees the previous seat automatically if reassigned. |
| `REMOVE_SEAT` | `{ passengerId }` | Removes the seat assigned to the specified passenger. |
| `SET_LAYOUT` | `{ layoutId, seats, occupiedSeats }` | Changes layout configuration and resets seat assignments to prevent invalid cross-layout positions. |
| `SET_MEAL` | `{ passengerId, mealId }` | Selects or clears meal preference for a passenger. |
| `ADD_TOAST` | `ToastMessage` | Pushes a notification into the UI toast queue. |
| `REMOVE_TOAST` | `number` | Dismisses a notification by ID. |
| `SET_LOADING` | `boolean` | Controls skeleton loader state. |
| `LOAD_SEATS` | `{ seats, occupiedSeats }` | Populates loaded seat matrix into state. |

---

## 🎯 Seat Assignment Logic & Conflict Prevention

Seat assignment enforces strict business rules defined in `validateAssignment`:

1. **One Seat Per Passenger**: When passenger $P_1$ selects a new seat while already holding one, their previous seat is freed automatically.
2. **No Double-Booking**: A seat already assigned to $P_1$ cannot be selected by $P_2$. The system rejects the action with error `SEAT_TAKEN_BY_OTHER` and informs the user via toast.
3. **Occupied Seats Are Immutable**: Seats flagged as pre-booked by the airline (`occupiedSeats`) cannot be clicked or assigned (`SEAT_OCCUPIED`).
4. **Active Passenger Required**: If no passenger is active when a seat is clicked, the UI alerts the user to select a passenger first.
5. **Switching Retains Group Assignments**: Switching between passengers in the list preserves every passenger's allocated seat.
6. **Reducing Group Size**: Decreasing passenger count from 4 to 2 safely discards seats held by $P_3$ and $P_4$ without corrupting state.

---

## 💰 Pricing Calculation

Pricing logic is encapsulated in pure functions in `src/utils/pricing.ts`:

- **Seat Pricing Model**:
  - Sample rows 1–2 adhere to the assessment spec:
    - 1A, 1B, 1D, 2B: **₹0 (Free / Standard)**
    - 1C, 2A: **₹350 (Extra Legroom)**
    - 1E: **₹250 (Premium)**
  - Rows 3–4: All seats **₹250 (Premium)**
  - Rows 5–6: All seats **₹350 (Extra Legroom)**
  - Rows 7–12: Window seats (A and E/H) **₹150**, middle/aisle **₹0**
- **Meal Pricing**:
  - Standard Meal & Light Snack Box: **₹0 (Free)**
  - Premium Thali: **₹350**
  - Non-Veg Premium: **₹450**
  - Continental Platter: **₹500**
- **Totals Calculation**:
  $$\text{Passenger Total} = \text{Seat Price} + \text{Meal Price}$$
  $$\text{Grand Total} = \sum_{p \in \text{passengers}} \text{Passenger Total}(p)$$
- **Instant Updates**: Grand total and per-passenger line items recalculate synchronously whenever seats or meals are selected, modified, or removed.

---

## 📐 Layout-Config Approach

Instead of hardcoding JSX for each layout, both `3-2` and `2-3-2` layouts are generated entirely from declarative configuration objects:

```typescript
export const layout32: LayoutConfig = {
  id: '3-2',
  name: '3–2 Configuration',
  groups: [
    { columns: ['A', 'B', 'C'] },
    { columns: ['D', 'E'] },
  ],
  totalRows: 12,
};

export const layout232: LayoutConfig = {
  id: '2-3-2',
  name: '2–3–2 Configuration',
  groups: [
    { columns: ['A', 'B'] },
    { columns: ['D', 'E', 'F'] },
    { columns: ['G', 'H'] },
  ],
  totalRows: 12,
};
```

The `SeatRow` component maps through `groups`, automatically rendering aisle gaps between groups and column labels (`A B | D E F | G H`). Adding future configurations (e.g., 3-3-3 wide-body) requires only adding a configuration object—no component changes required.

---

## 🔍 The 2-3-2 Spec Ambiguity & Architectural Decision

### The Ambiguity
In the assessment PDF specification:
- Layout 2 is named **"2–3–2 Configuration"**.
- The descriptive sentence states: *"Three groups of three seats separated by aisles"* (which would technically describe a 3-3-3 layout).
- However, the column example diagram and labels underneath explicitly illustrate:
  ```
  A  B  |  D  E  F  |  G  H
  ```
  This is 2 seats on the left, 3 in the middle, and 2 on the right (total 7 seats), skipping letter `C` to denote aisle separation.

### Our Resolution
We honored the exact column layout diagram `A B | D E F | G H`:
- Group 1: 2 seats (`A`, `B`)
- Group 2: 3 seats (`D`, `E`, `F`)
- Group 3: 2 seats (`G`, `H`)
This matches aviation industry standards for 2–3–2 twin-aisle cabins (such as the Boeing 767) where aisle gaps omit column letters. When switching between layouts, seat assignments are cleanly cleared to prevent invalid column references.

---

## 📝 Assumptions

1. **Seat Reallocation on Layout Switch**: When toggling between 3-2 and 2-3-2 layouts, seat assignments are reset to prevent column invalidation (e.g. seat `1C` does not exist in 2-3-2 layout).
2. **Passenger Count**: Constrained between 1 and 9 travelers, reflecting airline industry standards for standard web bookings.
3. **Currency & Localization**: Formatted in Indian Rupees (`₹`) formatted according to Indian numbering standards (`en-IN`).
4. **Mock Latency**: An artificial 600ms latency is included on initial mount and layout switch to showcase skeleton loading states.

---

## 🔮 What I Would Improve With More Time

1. **Multi-Leg Flight Support**: Enable outbound and return flight seat selection tabs.
2. **Keyboard Seat Grid Navigation**: Arrow-key navigation across rows and aisles with ARIA grid roles for screen-reader users.
3. **Emergency Exit Row Warnings**: Confirmation modal when selecting emergency exit rows (verifying passenger eligibility).
4. **Seatmap Mini-Map**: Canvas/SVG mini-navigator for aircraft with 30+ rows.
5. **Session Persistence**: Save booking progress to `localStorage` or `sessionStorage` across page reloads.

---

## 🚢 Vercel Deployment Instructions

1. Push your code to a public GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/flight-seat-selection.git
   git branch -M main
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New...** → **Project**.
4. Select the `flight-seat-selection` repository and click **Import**.
5. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.
7. Once deployed, copy your production URL (e.g. `https://flight-seat-selection.vercel.app`) and verify in an incognito window.
