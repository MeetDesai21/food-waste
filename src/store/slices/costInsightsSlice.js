import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  costMetrics: [],
  monthlyCosts: [],
  costBreakdown: [],
  savingsOpportunities: [],
  costAlerts: [],
};

const costInsightsSlice = createSlice({
  name: 'costInsights',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCostData: (state, action) => {
      state.costMetrics = action.payload.costMetrics;
      state.monthlyCosts = action.payload.monthlyCosts;
      state.costBreakdown = action.payload.costBreakdown;
      state.savingsOpportunities = action.payload.savingsOpportunities;
      state.costAlerts = action.payload.costAlerts;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setCostData } = costInsightsSlice.actions;
export default costInsightsSlice.reducer; 