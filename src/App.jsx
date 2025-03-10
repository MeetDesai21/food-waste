import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import FoodWasteTrends from './pages/FoodWasteTrends';
import InventoryStock from './pages/InventoryStock';
import DailyReports from './pages/DailyReports';
import VenueAnalysis from './pages/VenueAnalysis';
import CostInsights from './pages/CostInsights';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="waste-trends" element={<FoodWasteTrends />} />
            <Route path="inventory" element={<InventoryStock />} />
            <Route path="reports" element={<DailyReports />} />
            <Route path="venues" element={<VenueAnalysis />} />
            <Route path="costs" element={<CostInsights />} />
            {/* Add other routes as they are implemented */}
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}
