import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Goals = () => {
  const { goals, addGoal, toggleGoal, deleteGoal } = useData();
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      addGoal(newGoal);
      setNewGoal('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl font-bold mb-8 text-secondary-800">Wellness Goals</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex mb-6">
          <input
            type="text"
            className="flex-grow px-4 py-2 text-secondary-700 border rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter a new goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <motion.button
            className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors duration-200"
            onClick={handleAddGoal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={24} />
          </motion.button>
        </div>
        <AnimatePresence>
          {goals.map(goal => (
            <motion.div
              key={goal.id}
              className="flex items-center justify-between py-3 border-b"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
            >
              <span className={goal.completed ? 'line-through text-secondary-500' : ''}>
                {goal.text}
              </span>
              <div>
                <motion.button
                  className={`mr-2 ${goal.completed ? 'text-accent-500' : 'text-secondary-500'}`}
                  onClick={() => toggleGoal(goal.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CheckCircle size={24} />
                </motion.button>
                <motion.button
                  className="text-accent-700"
                  onClick={() => deleteGoal(goal.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XCircle size={24} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Goals;