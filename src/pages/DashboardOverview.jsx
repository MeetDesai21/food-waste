import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../api/mockApi';
import { setLoading, setError, updateSummary, updateWastageAnalytics } from '../store/slices/foodWasteSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function SummaryCard({ title, value, description, className }) {
  return (
    <div className={`card ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-primary-600">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

export default function DashboardOverview() {
  const dispatch = useDispatch();
  const { summary, wastageAnalytics, loading, error } = useSelector((state) => state.foodWaste);
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true));
        const [summaryData, analyticsData] = await Promise.all([
          api.getSummary(dateRange),
          api.getWastageAnalytics(dateRange),
        ]);
        dispatch(updateSummary(summaryData));
        dispatch(updateWastageAnalytics(analyticsData));
      } catch (err) {
        dispatch(setError('Failed to fetch dashboard data'));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData();
  }, [dispatch, dateRange]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track food waste metrics and identify areas for improvement
          </p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="input bg-white"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Food Served"
          value={`${summary.totalFoodServed} kg`}
          description={`${getDateRangeText()} total serving`}
        />
        <SummaryCard
          title="Total Food Wasted"
          value={`${summary.totalFoodWasted} kg`}
          description={`${(summary.totalFoodWasted / summary.totalFoodServed * 100).toFixed(1)}% of total food served`}
          className="bg-red-50"
        />
        <SummaryCard
          title="Most Efficient Day"
          value={summary.mostEfficientDay?.day}
          description={`Only ${summary.mostEfficientDay?.wastePercentage}% waste`}
          className="bg-green-50"
        />
        <SummaryCard
          title="Top Wasted Item"
          value={summary.topWastedItem?.name}
          description={`${summary.topWastedItem?.amount}${summary.topWastedItem?.unit} wasted`}
          className="bg-yellow-50"
        />
        <SummaryCard
          title="Average Cost of Waste"
          value={`₹${summary.averageCostOfWaste.toLocaleString()}`}
          description={`${getDateRangeText()} estimate`}
          className="bg-orange-50"
        />
        <SummaryCard
          title="Least Efficient Day"
          value={summary.leastEfficientDay?.day}
          description={`${summary.leastEfficientDay?.wastePercentage}% waste recorded`}
          className="bg-red-50"
        />
      </div>

      {/* Waste Trend Chart */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">
          {dateRange === 'today' ? 'Hourly' : 'Daily'} Waste Trend
        </h2>
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wastageAnalytics.dailyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="waste"
                stroke="#0ea5e9"
                fill="#e0f2fe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="btn-primary">
          Generate Report
        </button>
        <button className="btn-primary">
          View Inventory
        </button>
        <button className="btn-primary">
          Analyze Trends
        </button>
        <button className="btn-primary">
          Cost Analysis
        </button>
      </div>
    </div>
  );
} 