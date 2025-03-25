import React from 'react';
import { useGetDashboardStatsQuery } from '../../features/admin/adminApiSlice';
import { useGetAllUsersQuery } from '../../features/admin/adminApiSlice';
import { useGetPendingWorkshopsQuery } from '../../features/admin/adminApiSlice';
import { useGetAllTradesQuery } from '../../features/admin/adminApiSlice';
import UserGrowthChart from './UserGrowthChart';
import TradeStatusChart from './TradeStatusChart';
import TradesOverTime from './TradesOverTime';
import { FaUser, FaTools, FaShoppingBag, FaExchangeAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, link }) => (
  <Link to={link} className="block">
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className={`p-2 rounded-lg bg-blue-50 w-fit`}>
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold text-gray-800">{value || 0}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const ChartCard = ({ title, children, showPercentage = false }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {showPercentage && (
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Show Percentage</label>
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
        </div>
      )}
    </div>
    <div className="h-[300px]">
      {children}
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined, {
    pollingInterval: 30000,
  });
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery(undefined, {
    pollingInterval: 30000,
  });
  const { data: workshops, isLoading: workshopsLoading } = useGetPendingWorkshopsQuery(undefined, {
    pollingInterval: 30000,
  });
  const { data: trades, isLoading: tradesLoading } = useGetAllTradesQuery(undefined, {
    pollingInterval: 30000,
  });

  const isLoading = statsLoading || usersLoading || workshopsLoading || tradesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, check your statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Trades" 
          value={trades?.filter(t => !t.completed)?.length}
          icon={FaExchangeAlt}
          link="/admin/trades"
        />
        <StatCard 
          title="Total Users" 
          value={users?.length}
          icon={FaUsers}
          link="/admin/users"
        />
        <StatCard 
          title="Pending Workshops" 
          value={workshops?.length}
          icon={FaTools}
          link="/admin/workshops"
        />
        <StatCard 
          title="Completed Trades" 
          value={trades?.filter(t => t.completed)?.length}
          icon={FaShoppingBag}
          link="/admin/trades"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Trades by Status" showPercentage>
          <TradeStatusChart trades={trades} />
        </ChartCard>
        <ChartCard title="User Growth (Weekly)">
          <UserGrowthChart data={users} />
        </ChartCard>
      </div>

      {/* Timeline Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Trades over time</h2>
          </div>
          <div className="h-[300px]">
            <TradesOverTime data={trades} />
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
            <Link to="/admin/users" className="text-blue-600 hover:text-blue-700 text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {users?.slice(0, 5).map((user, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{user.email}</p>
                    <p className="text-xs text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Pending Workshops</h2>
            <Link to="/admin/workshops" className="text-blue-600 hover:text-blue-700 text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {workshops?.slice(0, 5).map((workshop, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <FaTools className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{workshop.workshop_name}</p>
                    <p className="text-xs text-gray-500">{workshop.workshop_date}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Trades</h2>
            <Link to="/admin/trades" className="text-blue-600 hover:text-blue-700 text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {trades?.slice(0, 5).map((trade, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaExchangeAlt className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">Trade #{trade.exchange_id}</p>
                    <p className="text-xs text-gray-500">{new Date(trade.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trade.pending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {trade.pending ? 'Pending' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 