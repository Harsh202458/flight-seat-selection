# Frontend Developer Assessment
## Flight Seat Selection & Passenger Management

**Technology:** React.js  
**Difficulty:** Intermediate  
**Suggested time:** 3–4 hours

## 1. Objective

Build a flight seat selection interface where users can select the number of passengers, view the aircraft seating layout, assign seats to individual passengers, and see the total seat-selection cost.

The application should provide an intuitive and responsive user experience.

## 2. Functional Requirements

### A. Passenger Selection

- Allow users to select the number of passengers.
- Provide a passenger list based on the selected passenger count.
- Allow users to switch between passengers while selecting seats.
- Display each passenger's name or identifier and their currently assigned seat.
- Each passenger can be assigned only one seat.
- A seat cannot be assigned to multiple passengers.

### B. Aircraft Seat Layout

The application must support two aircraft seating configurations:

**Layout 1: 3–2 Configuration**
Three seats on one side of the aisle and two seats on the other side.
Column labels: A B C | D E

**Layout 2: 2–3–2 Configuration**
Two seats, then three seats, then two seats separated by aisles.
Column labels: A B | D E F | G H

- Allow users to switch between the two seating configurations.
- Display row numbers and seat labels.
- Differentiate between available, occupied, selected, and free seats.
- Occupied seats must not be selectable.
- Display the price of a seat when selecting it or viewing its details.
- Some seats should be free, while others should have different prices.
- Visually distinguish seats with different pricing categories if appropriate.

### C. Passenger-to-Seat Assignment

- The user should select a passenger before assigning a seat.
- Clicking an available seat should assign it to the currently selected passenger.
- The selected passenger's assigned seat should be clearly visible.
- Users should be able to change or remove an assigned seat.
- When a passenger is switched, the application should retain previous seat assignments.
- Prevent two passengers from occupying the same seat.

### D. Seat Pricing & Total Calculation

- Each seat should have an associated price.
- Seat prices can vary depending on their position or category.
- Some seats should have a price of zero.
- Display the selected seat price for each passenger.
- Calculate and display the total cost of all selected seats.
- Update the total immediately whenever a seat is selected, changed, or removed.

## 3. Bonus Feature: Meal Selection

- Display available meal options for each passenger.
- Allow passengers to select one meal.
- Support free and paid meal options.
- Display the selected meal for each passenger.
- Include meal charges in the final total.

## 4. Sample Data

Use mock data. No backend integration is required.

| Seat | Category | Price |
|------|----------|-------|
| 1A | Standard | ₹0 |
| 1B | Standard | ₹0 |
| 1C | Extra Legroom | ₹350 |
| 1D | Standard | ₹0 |
| 1E | Premium | ₹250 |
| 2A | Extra Legroom | ₹350 |
| 2B | Standard | ₹0 |

Create additional rows and seat data to demonstrate the functionality.

## 5. UI/UX Expectations

- Clean, modern and intuitive interface.
- Clear visual distinction between seat states.
- Easy passenger switching and seat assignment.
- Proper loading, empty and error states wherever applicable.
- Responsive layout for different screen sizes.
- Appropriate feedback for invalid actions.
- Clear breakdown of selected seats and total charges.

## 6. Technical Expectations

- Use React.js.
- Use reusable components.
- Maintain a clean and understandable project structure.
- Manage application state appropriately.
- Avoid unnecessary code duplication.
- Use meaningful variable and component names.
- Ensure the application works without runtime errors.

## 7. Deliverables

1. Complete source code in a GitHub repository.
2. Host the project on GitHub Pages or Vercel.
3. A brief explanation of the state management and seat assignment logic in README.

## 8. Evaluation Criteria

| Evaluation Area | Weight |
|----------------|--------|
| UI/UX and visual implementation | 20% |
| Seat layout and configuration handling | 20% |
| Passenger and seat assignment logic | 20% |
| Pricing and total calculations | 15% |
| Code quality and component architecture | 15% |
| Responsiveness and edge-case handling | 10% |
| **Total** | **100%** |

Bonus: Meal selection can earn additional credit.

## 9. Important Notes

- The assessment should be completed independently.
- Backend integration and actual flight booking functionality are not required.
- Candidates may use mock data and local state management.
- Candidates are free to choose their UI design and component architecture.
- Functionality, code quality, and user experience will all be considered during evaluation.
