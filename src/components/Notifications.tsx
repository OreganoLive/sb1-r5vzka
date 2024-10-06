import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating notifications
    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: 'Remember to log your mood today!',
      };
      setNotifications(prev => [...prev, newNotification]);
    }, 60000); // Add a new notification every minute

    return () => clearInterval(timer);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center"
          >
            <p className="text-secondary-800 flex-grow">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-secondary-400 hover:text-secondary-600"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;