import type { Meal } from '../types';

export const meals: Meal[] = [
  {
    id: 'meal-1',
    name: 'Standard Meal',
    description: 'Rice, dal, bread, and seasonal vegetables',
    price: 0,
    isVeg: true,
  },
  {
    id: 'meal-2',
    name: 'Light Snack Box',
    description: 'Sandwich, chips, cookie, and juice',
    price: 0,
    isVeg: true,
  },
  {
    id: 'meal-3',
    name: 'Premium Thali',
    description: 'Paneer tikka, naan, biryani rice, raita, and dessert',
    price: 350,
    isVeg: true,
  },
  {
    id: 'meal-4',
    name: 'Non-Veg Premium',
    description: 'Chicken curry, rice, naan, salad, and dessert',
    price: 450,
    isVeg: false,
  },
  {
    id: 'meal-5',
    name: 'Continental Platter',
    description: 'Grilled chicken, mashed potatoes, steamed vegetables, brownie',
    price: 500,
    isVeg: false,
  },
];
