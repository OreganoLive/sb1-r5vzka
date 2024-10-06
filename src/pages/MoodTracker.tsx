import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const moods = [
  { name: 'Joyful', icon: Smile, color: 'text-accent-500' },
  { name: 'Content', icon: Sun, color: 'text-accent-400' },
  { name: 'Neutral', icon: Meh, color: 'text-secondary-400' },
  { name: 'Anxious', icon: Wind, color: 'text-primary-400' },
  { name: 'Sad', icon: CloudRain, color: 'text-primary-600' },
  { name: 'Angry', icon: Cloud, color: 'text-accent-700' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const { addMoodEntry } = useData();

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      addMoodEntry({ mood: selectedMood, reflection, date: new Date() });
      setSelectedMood(null);
      setReflection('');
    }
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-secondary-800">Mood Tracker</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-secondary-700">How are you feeling today?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {moods.map((mood) => (
            <motion.button
              key={mood.name}
              className={`p-4 rounded-full flex flex-col items-center justify-center ${
                selectedMood === mood.name ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-secondary-100'
              }`}
              onClick={() => handleMoodSelect(mood.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <mood.icon className={`${mood.color} mb-2`} size={48} />
              <p className="text-sm font-medium">{mood.name}</p>
            </motion.button>
          ))}
        </div>
        <div className="mb-6">
          <label htmlFor="reflection" className="block text-sm font-medium text-secondary-700 mb-2">
            Reflection (optional)
          </label>
          <textarea
            id="reflection"
            rows={4}
            className="w-full px-3 py-2 text-secondary-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Write your thoughts here..."
            value={reflection}
            onChange={handleReflectionChange}
          ></textarea>
        </div>
        <motion.button
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          onClick={handleSubmit}
          disabled={!selectedMood}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Log Mood
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MoodTracker;