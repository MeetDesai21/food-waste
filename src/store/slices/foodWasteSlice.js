import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  summary: {
    totalFoodServed: 0,
    totalFoodWasted: 0,
    topWastedItem: null,
    mostEfficientDay: null,
    leastEfficientDay: null,
    averageCostOfWaste: 0,
  },
  wastageAnalytics: {
    dailyTrends: [],
    worstWasteDay: null,
    mostWastedItems: [],
    leastWastedItems: [],
    locationWaste: {},
  },
  mealAnalysis: {
    breakfast: { waste: 0, served: 0 },
    lunch: { waste: 0, served: 0 },
    dinner: { waste: 0, served: 0 },
  },
  inventory: {
    lowStockItems: [],
    usageTrends: {},
    purchaseRecommendations: [],
  },
  loading: false,
  error: null,
};

const foodWasteSlice = createSlice({
  name: 'foodWaste',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateSummary: (state, action) => {
      state.summary = { ...state.summary, ...action.payload };
    },
    updateWastageAnalytics: (state, action) => {
      state.wastageAnalytics = { ...state.wastageAnalytics, ...action.payload };
    },
    updateMealAnalysis: (state, action) => {
      state.mealAnalysis = { ...state.mealAnalysis, ...action.payload };
    },
    updateInventory: (state, action) => {
      state.inventory = { ...state.inventory, ...action.payload };
    },
  },
});

export const {
  setLoading,
  setError,
  updateSummary,
  updateWastageAnalytics,
  updateMealAnalysis,
  updateInventory,
} = foodWasteSlice.actions;

export default foodWasteSlice.reducer; 