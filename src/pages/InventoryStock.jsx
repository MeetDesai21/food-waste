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
} from 'recharts';
import { ExclamationTriangleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { api } from '../api/mockApi';
import { setLoading, setError, updateInventory } from '../store/slices/foodWasteSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function InventoryCard({ title, value, unit, threshold, trend, className }) {
  return (
    <div className={`card ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">
            {value} {unit}
          </p>
          {threshold && (
            <p className="mt-1 text-sm text-gray-500">
              Threshold: {threshold} {unit}
            </p>
          )}
        </div>
        {trend && (
          <span className={`flex items-center text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? (
              <ArrowTrendingUpIcon className="w-5 h-5 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="w-5 h-5 mr-1" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default function InventoryStock() {
  const dispatch = useDispatch();
  const { inventory, loading, error } = useSelector((state) => state.foodWaste);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedItem, setSelectedItem] = useState('Rice'); // Default selected item for usage trends

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true));
        const inventoryData = await api.getInventory();
        dispatch(updateInventory(inventoryData));
      } catch (err) {
        dispatch(setError('Failed to fetch inventory data'));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData();
  }, [dispatch]);

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

  // Ensure inventory data exists with default values
  const safeInventory = {
    lowStockItems: inventory?.lowStockItems || [],
    usageTrends: inventory?.usageTrends || {},
    purchaseRecommendations: inventory?.purchaseRecommendations || [],
  };

  // Filter and search inventory items
  const filteredItems = safeInventory.lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'low') return matchesSearch && item.quantity < item.threshold;
    return matchesSearch;
  });

  // Transform usage trends data
  const usageTrendsData = safeInventory.usageTrends[selectedItem]
    ? Array.isArray(safeInventory.usageTrends[selectedItem])
      ? safeInventory.usageTrends[selectedItem].map((value, index) => ({
          day: `Day ${index + 1}`,
          usage: value,
        }))
      : []
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory & Stock Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track inventory levels and manage stock efficiently
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input bg-white"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input bg-white"
          >
            <option value="all">All Items</option>
            <option value="low">Low Stock</option>
          </select>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {safeInventory.lowStockItems.some(item => item.quantity < item.threshold) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Some items are running low and need to be restocked soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <InventoryCard
            key={item.name}
            title={item.name}
            value={item.quantity}
            unit={item.unit}
            threshold={item.threshold}
            trend={((item.quantity - item.threshold) / item.threshold) * 100}
            className={item.quantity < item.threshold ? 'border-l-4 border-red-400' : ''}
          />
        ))}
      </div>

      {/* Usage Trends */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Usage Trends</h2>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="input bg-white"
          >
            {Object.keys(safeInventory.usageTrends).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="usage"
                name="Daily Usage"
                stroke="#0ea5e9"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Purchase Recommendations */}
      <div className="card bg-green-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Purchase Recommendations</h2>
          <button className="btn-primary">Generate Order</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommended Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {safeInventory.purchaseRecommendations.map((item) => (
                <tr key={item.item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {safeInventory.lowStockItems.find(i => i.name === item.item)?.quantity || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 