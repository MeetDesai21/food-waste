import { configureStore } from '@reduxjs/toolkit';
import foodWasteReducer from './slices/foodWasteSlice';
import costInsightsReducer from './slices/costInsightsSlice';

export const store = configureStore({
  reducer: {
    foodWaste: foodWasteReducer,
    costInsights: costInsightsReducer,
  },
}); 