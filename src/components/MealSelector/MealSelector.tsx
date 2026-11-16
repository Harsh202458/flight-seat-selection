import { meals } from '../../data/meals';
import { useBooking } from '../../context';
import { formatPrice } from '../../utils/pricing';
import './MealSelector.css';

interface MealSelectorProps {
  passengerId: number;
  selectedMealId: string | null;
}

export function MealSelector({ passengerId, selectedMealId }: MealSelectorProps) {
  const { setMeal } = useBooking();

  return (
    <div className="meal-selector">
      <label className="meal-selector__label">Meal Preference</label>
      <div className="meal-selector__options">
        <button
          className={`meal-selector__option ${!selectedMealId ? 'meal-selector__option--active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMeal(passengerId, null);
          }}
        >
          <span className="meal-selector__option-name">No Meal</span>
        </button>
        {meals.map((meal) => (
          <button
            key={meal.id}
            className={`meal-selector__option ${
              selectedMealId === meal.id ? 'meal-selector__option--active' : ''
            } ${meal.isVeg ? 'meal-selector__option--veg' : 'meal-selector__option--nonveg'}`}
            onClick={(e) => {
              e.stopPropagation();
              setMeal(passengerId, meal.id);
            }}
            title={meal.description}
          >
            <span className="meal-selector__veg-badge">{meal.isVeg ? '🟢' : '🔴'}</span>
            <div className="meal-selector__option-info">
              <span className="meal-selector__option-name">{meal.name}</span>
              <span className="meal-selector__option-price">
                {meal.price === 0 ? 'Free' : formatPrice(meal.price)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
