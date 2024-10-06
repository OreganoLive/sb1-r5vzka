import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Smartphone, Coffee, Book, Dumbbell, Utensils } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const activities = [
  { name: 'Exercise', icon: Dumbbell, color: 'text-accent-500' },
  { name: 'Reading', icon: Book, color: 'text-primary-500' },
  { name: 'Meditation', icon: Coffee, color: 'text-secondary-500' },
  { name: 'Healthy Meal', icon: Utensils, color: 'text-accent-400' },
];

const ActivityTracker = () => {
  const [steps, setSteps] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const { addActivityEntry } = useData();

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivityEntry({
      steps: parseInt(steps),
      screenTime: parseFloat(screenTime),
      activities: selectedActivities,
      date: new Date()
    });
    setSteps('');
    setScreenTime('');
    setSelectedActivities([]);
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-secondary-800">Activity Tracker</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-secondary-700 mb-2">
                <Footprints className="inline-block mr-2 text-primary-500" size={20} />
                Steps
              </label>
              <input
                type="number"
                id="steps"
                className="w-full px-3 py-2 text-secondary-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter number of steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="screenTime" className="block text-sm font-medium text-secondary-700 mb-2">
                <Smartphone className="inline-block mr-2 text-primary-500" size={20} />
                Screen Time (hours)
              </label>
              <input
                type="number"
                id="screenTime"
                step="0.1"
                className="w-full px-3 py-2 text-secondary-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter screen time in hours"
                value={screenTime}
                onChange={(e) => setScreenTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-secondary-700">Activities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {activities.map((activity) => (
                <motion.button
                  key={activity.name}
                  type="button"
                  className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                    selectedActivities.includes(activity.name)
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-secondary-100'
                  }`}
                  onClick={() => handleActivityToggle(activity.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <activity.icon className={`${activity.color} mb-2`} size={32} />
                  <p className="text-sm font-medium">{activity.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            type="submit"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log Activity
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ActivityTracker;