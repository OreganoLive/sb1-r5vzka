import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import ActivityTracker from './pages/ActivityTracker';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Notifications from './components/Notifications';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
        <Route path="/activity" element={<PrivateRoute><ActivityTracker /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex h-screen bg-secondary-100">
            <Sidebar />
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              <Notifications />
              <AnimatedRoutes />
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;