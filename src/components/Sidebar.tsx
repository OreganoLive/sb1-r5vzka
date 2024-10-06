import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Activity, Target, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: '/mood', icon: BarChart2, label: 'Mood Tracker' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/goals', icon: Target, label: 'Goals' },
  ];

  return (
    <div className="bg-gray-900 w-20 h-full flex flex-col items-center py-8">
      <div className="mb-8">
        <img src="/logo.svg" alt="Epilogia" className="w-12 h-12" />
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`w-full p-3 mb-4 flex justify-center ${
              location.pathname === item.path ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon size={24} />
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full p-3 text-gray-400 hover:text-white flex justify-center"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;