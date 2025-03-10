import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  ChartBarIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard Overview', href: '/', icon: HomeIcon },
  { name: 'Food Consumption & Waste', href: '/waste-trends', icon: ChartBarIcon },
  { name: 'Inventory & Stock', href: '/inventory', icon: ClipboardDocumentListIcon },
  { name: 'Daily Reports', href: '/reports', icon: DocumentChartBarIcon },
  { name: 'Venue Analysis', href: '/venues', icon: BuildingStorefrontIcon },
  { name: 'Cost Insights', href: '/costs', icon: CurrencyDollarIcon },
];

function NavigationLink({ item }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mt-2 text-gray-600 rounded-md hover:bg-gray-100 ${
          isActive ? 'bg-primary-50 text-primary-600' : ''
        }`
      }
      end={item.href === '/'}
    >
      <item.icon className="w-6 h-6 mr-3" />
      {item.name}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-6 bg-primary-600">
            <h2 className="text-xl font-bold text-white">Food Waste Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <nav className="px-3 mt-6">
            {navigation.map((item) => (
              <NavigationLink key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-6 bg-primary-600">
            <h2 className="text-xl font-bold text-white">Food Waste Dashboard</h2>
          </div>
          <nav className="flex-1 px-3 mt-6">
            {navigation.map((item) => (
              <NavigationLink key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h2 className="ml-4 text-lg font-medium">Food Waste Dashboard</h2>
        </div>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 