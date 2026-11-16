# ✈️ Flight Seat Selection & Passenger Management

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://flight-seat-selection-xi.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-31%20Passed-6E9F18?style=flat&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, accessible, and responsive flight seat selection application built with **React 19**, **TypeScript**, and **Vite**. Features multi-passenger booking, dynamic aircraft layout configurations (3–2 and 2–3–2), real-time pricing calculation, strict seat conflict resolution, interactive meal selection, and mobile-first responsiveness.

---

## 🌐 Live Application & Repository

- **Live URL**: [https://flight-seat-selection-xi.vercel.app](https://flight-seat-selection-xi.vercel.app)
- **GitHub Repository**: [https://github.com/Harsh202458/flight-seat-selection](https://github.com/Harsh202458/flight-seat-selection)

---

## ✨ Key Features

- **Multi-Passenger Management**: Interactive stepper (1–9 passengers), dynamic passenger list, active passenger switching, and per-passenger seat/meal allocation.
- **Config-Driven Aircraft Layouts**: Declarative cabin rendering supporting:
  - **3–2 Configuration**: 3 seats (`A B C`), aisle, 2 seats (`D E`)
  - **2–3–2 Configuration**: 2 seats (`A B`), aisle, 3 seats (`D E F`), aisle, 2 seats (`G H`)
- **Visual Seat Status & Differentiation**:
  - `Available`: Standard, Extra Legroom, or Premium pricing tiers.
  - `Occupied`: Pre-booked seats marked with `✕` (unclickable / disabled).
  - `Selected (Active)`: Highlighted in primary indigo with a checkmark (`✓`).
  - `Selected (Other)`: Distinctive purple badge showing the passenger identifier (e.g. `P1`, `P2`).
- **Conflict Prevention Engine**: Reassigning a passenger auto-frees their previous seat; double-booking across passengers is rejected with typed errors and toast alerts.
- **Real-Time Price Breakdown**: Instant line-item pricing for seats and meals formatted in Indian Rupee (`₹`) using `Intl.NumberFormat('en-IN')`.
- **Bonus Feature — Meal Selection**: Free and paid meal options with dietary badges (Veg `🟢` / Non-Veg `🔴`) integrated directly into passenger cards and the grand total.
- **Responsive Layout**: Desktop side-by-side view (seat map left, passenger cards right) and mobile layout with a fixed bottom checkout bar.
- **Zero External State Libraries**: Built purely on React Context + `useReducer` for predictable, zero-overhead state management.
- **Full Test Suite**: 31 comprehensive unit tests covering the reducer, selectors, conflict handling, and edge cases.

---

## 🛠️ Tech Stack & Tools

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 19 | Component-based UI with fast concurrent rendering |
| **Build Tool** | Vite 6 | Lightning-fast HMR and optimized production bundling |
| **Language** | TypeScript (Strict) | 100% type safety with zero `any` types |
| **State** | Context + `useReducer` | Predictable, unidirectional, testable application state |
| **Styling** | Vanilla CSS | Custom design system using CSS variables, Flexbox & CSS Grid |
| **Testing** | Vitest + Testing Library | 31 unit tests validating business rules and pricing logic |
| **Deployment** | Vercel | Production hosting with automated continuous deployment |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Harsh202458/flight-seat-selection.git
cd flight-seat-selection

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Test & Build Scripts

```bash
# Run Vitest unit tests
npm run test

# Run TypeScript type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
flight-seat-selection/
├── public/                     # Static icons and assets
├── src/
│   ├── __tests__/              # Automated unit tests (31 passing tests)
│   │   ├── bookingReducer.test.ts
│   │   ├── pricing.test.ts
│   │   └── setup.ts
│   ├── components/
│   │   ├── common/             # Toast notification alerts
│   │   │   ├── Toast.tsx
│   │   │   ├── Toast.css
│   │   │   └── index.ts
│   │   ├── Layout/             # Responsive layout components (MobileTotal)
│   │   │   ├── MobileTotal.tsx
│   │   │   ├── MobileTotal.css
│   │   │   └── index.ts
│   │   ├── MealSelector/       # Meal preference selector
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
│   │   ├── PriceSummary/       # Line-item pricing breakdown & grand total
│   │   │   ├── PriceSummary.tsx
│   │   │   ├── PriceSummary.css
│   │   │   └── index.ts
│   │   └── SeatMap/            # LayoutToggle, SeatRow, Seat, Tooltip, Legend
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
│   ├── context/                # Global Context and useReducer logic
│   │   ├── BookingContext.tsx
│   │   ├── bookingReducer.ts
│   │   └── index.ts
│   ├── data/                   # Cabin layouts, seats generator, mock meals
│   │   ├── layouts.ts
│   │   ├── meals.ts
│   │   ├── seats.ts
│   │   └── index.ts
│   ├── types/                  # Shared TypeScript interfaces & types
│   │   └── index.ts
│   ├── utils/                  # Pure calculation & formatting utilities
│   │   └── pricing.ts
│   ├── App.tsx                 # Main layout structure
│   ├── App.css                 # Global styling & layout grid
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts
├── ASSIGNMENT.md               # Assessment specifications in Markdown
├── GEMINI.md                   # Project rules and architectural guidelines
├── index.html                  # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧠 State Management Architecture

### Why `useReducer` + React Context?

1. **Atomic State Transitions**: Multi-passenger seat selection involves coordinated state updates (reducing passenger count drops extra seats, reassigning a seat vacates the old one, switching layouts clears seat allocations). `useReducer` guarantees that all state transitions are pure, atomic, and testable without UI side effects.
2. **Zero External Overhead**: Achieves full predictability without the bundle size and boilerplate of Redux or Zustand.
3. **Pure Validation Layer**: The `validateAssignment` selector checks occupancy, duplicates, and passenger existence before updating state, returning typed error codes (`SEAT_OCCUPIED`, `SEAT_TAKEN_BY_OTHER`, `PASSENGER_NOT_FOUND`).

### State Shape (`BookingState`)

```typescript
interface BookingState {
  passengerCount: number;             // Number of passengers (1–9)
  passengers: Passenger[];           // Array of { id, name, seatId, mealId }
  activePassengerId: number | null;  // Currently active passenger ID
  layoutType: string;                // Active layout ID ('3-2' | '2-3-2')
  layouts: LayoutConfig[];           // Registered layout configurations
  seats: Seat[];                     // Generated seats matrix for active layout
  occupiedSeats: Set<string>;        // Pre-booked seat IDs (disabled)
  toasts: ToastMessage[];            // Active toast feedback messages
  isLoading: boolean;                // Async loading state flag
  error: string | null;              // Error boundary / load failure state
}
```

### Action Dispatch Reference

| Action | Payload | Behavior |
| :--- | :--- | :--- |
| `SET_PASSENGER_COUNT` | `number` | Updates passenger count. Preserves assignments when increasing; cleanly drops trailing seats when reduced. |
| `SET_ACTIVE_PASSENGER` | `number \| null` | Focuses a passenger for seat or meal selection. |
| `ASSIGN_SEAT` | `{ passengerId, seatId }` | Reassigns seat; automatically vacates the previous seat held by that passenger. |
| `REMOVE_SEAT` | `{ passengerId }` | Removes the seat assigned to the specified passenger. |
| `SET_LAYOUT` | `{ layoutId, seats, occupiedSeats }` | Changes layout configuration and resets all seat assignments to prevent invalid cabin positions. |
| `SET_MEAL` | `{ passengerId, mealId }` | Updates or clears meal selection for a passenger. |
| `ADD_TOAST` | `ToastMessage` | Pushes a notification into the UI alert queue. |
| `REMOVE_TOAST` | `number` | Clears a notification after timeout or dismissal. |
| `LOAD_SEATS` | `{ seats, occupiedSeats }` | Injects loaded seat matrix into state. |

---

## 🎯 Seat Assignment & Conflict Prevention Rules

The `validateAssignment` function enforces all assignment logic prior to state changes:

1. **One Seat Per Passenger**: When a passenger with an existing seat picks a new seat, their previous seat is freed automatically.
2. **No Double-Booking**: If Seat `1A` is held by Passenger 1, Passenger 2 cannot pick it. The action is blocked with error `SEAT_TAKEN_BY_OTHER` and a toast notification is displayed.
3. **Occupied Seats Are Immutable**: Seats flagged as pre-booked by the airline (`occupiedSeats`) cannot be selected (`SEAT_OCCUPIED`).
4. **Active Passenger Required**: If a user clicks a seat without an active passenger selected, the action is rejected with a prompt to select a passenger first.
5. **Passenger Switching Retains Seats**: Switching between passengers in the list leaves all existing selections intact.
6. **Reducing Passenger Count**: Lowering passenger count from 4 to 2 cleanly discards assignments for Passengers 3 and 4 without leaving orphan states.

---

## 💰 Pricing & Total Calculation

Seat and meal pricing calculations reside in pure functions in `src/utils/pricing.ts`:

### Seat Pricing
- **Rows 1–2 (Assessment Spec)**:
  - `1A`, `1B`, `1D`, `2B`: **₹0 (Free / Standard)**
  - `1C`, `2A`: **₹350 (Extra Legroom)**
  - `1E`: **₹250 (Premium)**
- **Rows 3–4**: All seats **₹250 (Premium)**
- **Rows 5–6**: All seats **₹350 (Extra Legroom)**
- **Rows 7–12**: Window seats (`A`, `E`/`H`) **₹150**, middle/aisle seats **₹0**

### Meal Pricing (Bonus Feature)
- Standard Meal: **₹0 (Free)**
- Light Snack Box: **₹0 (Free)**
- Premium Thali: **₹350**
- Non-Veg Premium: **₹450**
- Continental Platter: **₹500**

### Total Formulas
```text
Passenger Total = Seat Price + Meal Price
Grand Total     = Sum of all Passenger Totals
```

All totals update immediately when any seat or meal is selected, modified, or removed.

---

## 📐 Declarative Layout Configuration

Rather than duplicating JSX for each cabin configuration, the seat map is rendered dynamically from layout configuration objects:

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

The `SeatRow` component maps through `groups`, creating aisle gaps automatically. Future aircraft layouts (e.g., 3-3-3 wide-body) can be added simply by defining a new config object.

---

## 🔍 The 2–3–2 Spec Ambiguity & Architectural Decision

### The Ambiguity
In the assessment specification document:
- Layout 2 is named **"2–3–2 Configuration"**.
- The descriptive sentence states: *"Three groups of three seats separated by aisles"* (which describes a 3–3–3 layout).
- However, the column diagram explicitly illustrates:
  ```
  A  B  |  D  E  F  |  G  H
  ```
  This is 2 seats on the left, 3 in the middle, and 2 on the right (7 seats total), skipping letter `C` for the aisle.

### Our Resolution
We honored the exact column layout diagram `A B | D E F | G H`:
- Group 1: 2 seats (`A`, `B`)
- Group 2: 3 seats (`D`, `E`, `F`)
- Group 3: 2 seats (`G`, `H`)

This adheres to commercial aviation standards for 2–3–2 twin-aisle cabins (e.g. Boeing 767). When switching configurations, seat allocations are reset to prevent invalid column references.

---

## 📝 Design Assumptions

1. **Seat Reset on Layout Switch**: Switching between 3–2 and 2–3–2 clears seat selections because column matrices differ (e.g. seat `1C` exists in 3–2 but does not exist in 2–3–2).
2. **Passenger Count**: Constrained between 1 and 9 travelers, reflecting airline industry standards for consumer web bookings.
3. **Currency & Localization**: Formatted in Indian Rupees (`₹`) adhering to Indian numbering conventions (`en-IN`).
4. **Mock Latency**: A brief 600ms simulated latency showcases the skeleton loading UI on initial mount and layout toggle.

---

## 🔮 Future Enhancements

1. **Multi-Leg Flight Support**: Tabs for outbound and return flight seat selection.
2. **Keyboard Seat Grid Navigation**: Arrow-key navigation across rows and aisles with ARIA grid roles.
3. **Exit Row Verification**: Confirmation dialog verifying passenger eligibility before assigning emergency exit rows.
4. **Mini-Map Navigator**: SVG miniature overview for wide-body aircraft with 30+ rows.
5. **Local Persistence**: Save in-progress bookings in `localStorage` across page reloads.

---

## 🚢 Deployment & Hosting

The application is deployed and hosted on **Vercel** with continuous deployment connected to the `main` branch:

- **Production URL**: [https://flight-seat-selection-xi.vercel.app](https://flight-seat-selection-xi.vercel.app)
- **Hosting Platform**: Vercel
- **Build Settings**: Framework: Vite | Output Directory: `dist`
- **SSL / CDN**: Enabled automatically via Vercel Edge Network
