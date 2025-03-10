import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { api } from '../api/mockApi';
import { setLoading, setError, updateWastageAnalytics, updateMealAnalysis } from '../store/slices/foodWasteSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const COLORS = ['#0284c7', '#22c55e', '#ef4444', '#f59e0b'];

function WastageMetricCard({ title, value, description, trend, className }) {
  return (
    <div className={`card ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-primary-600">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {trend && (
        <p className={`mt-2 text-sm ${trend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
        </p>
      )}
    </div>
  );
}

export default function FoodWasteTrends() {
  const dispatch = useDispatch();
  const { wastageAnalytics, mealAnalysis, loading, error } = useSelector((state) => state.foodWaste);
  const [dateRange, setDateRange] = useState('today');
  const [selectedVenue, setSelectedVenue] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true));
        const [analyticsData, mealData] = await Promise.all([
          api.getWastageAnalytics(dateRange, selectedVenue),
          api.getMealAnalysis(),
        ]);
        dispatch(updateWastageAnalytics(analyticsData));
        dispatch(updateMealAnalysis(mealData));
      } catch (err) {
        dispatch(setError('Failed to fetch waste trends data'));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData();
  }, [dispatch, dateRange, selectedVenue]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Transform meal analysis data for the pie chart
  const mealWasteData = Object.entries(mealAnalysis).map(([meal, data]) => ({
    name: meal.charAt(0).toUpperCase() + meal.slice(1),
    value: data.waste,
  }));

  const getDateRangeText = () => {
    switch (dateRange) {
      case 'today':
        return "Today's";
      case 'week':
        return "This week's";
      case 'month':
        return "This month's";
      default:
        return "Today's";
    }
  };

  const getVenueName = () => {
    switch (selectedVenue) {
      case 'venue-a':
        return 'Venue A';
      case 'venue-b':
        return 'Venue B';
      case 'venue-c':
        return 'Venue C';
      default:
        return 'All Venues';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Consumption & Waste Trends</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analyze food waste patterns and identify areas for improvement
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input bg-white"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="input bg-white"
          >
            <option value="all">All Venues</option>
            <option value="venue-a">Venue A</option>
            <option value="venue-b">Venue B</option>
            <option value="venue-c">Venue C</option>
          </select>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <WastageMetricCard
          title="Total Waste"
          value={`${wastageAnalytics.totalWaste} kg`}
          description={`${getDateRangeText()} waste at ${getVenueName()}`}
          trend={5}
        />
        <WastageMetricCard
          title="Waste Cost"
          value={`₹${wastageAnalytics.wasteCost.toLocaleString()}`}
          description={`${getDateRangeText()} cost impact`}
          trend={-2}
          className="bg-orange-50"
        />
        <WastageMetricCard
          title="Most Wasted"
          value={wastageAnalytics.mostWastedItem.name}
          description={`${wastageAnalytics.mostWastedItem.amount}kg wasted`}
          className="bg-yellow-50"
        />
        <WastageMetricCard
          title="Efficiency"
          value={`${wastageAnalytics.efficiency}%`}
          description="Food utilization rate"
          trend={-1}
          className="bg-green-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Waste Trend */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {dateRange === 'today' ? 'Hourly' : dateRange === 'month' ? 'Weekly' : 'Daily'} Waste Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wastageAnalytics.dailyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="waste"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  name="Waste (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meal-wise Waste Distribution */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Meal-wise Waste Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mealWasteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mealWasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Wasted Items */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Most Wasted Items</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wastageAnalytics.mostWastedItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#0ea5e9" name="Amount (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Venue-wise Waste */}
        {selectedVenue === 'all' && (
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Venue-wise Waste</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(wastageAnalytics.locationWaste).map(([venue, waste]) => ({
                    venue,
                    waste,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="venue" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="waste" fill="#22c55e" name="Waste (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="card bg-blue-50">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {selectedVenue === 'all'
              ? 'Implement portion control measures across all venues'
              : `Optimize portion sizes at ${getVenueName()} based on consumption patterns`}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            {`Review ${wastageAnalytics.mostWastedItem.name} preparation process to reduce waste`}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {`Current efficiency rate of ${wastageAnalytics.efficiency}% can be improved through better inventory management`}
          </li>
        </ul>
      </div>
    </div>
  );
} 