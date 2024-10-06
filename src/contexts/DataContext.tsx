import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (user) {
      const storedMoodData = localStorage.getItem(`moodData_${user.id}`);
      const storedActivityData = localStorage.getItem(`activityData_${user.id}`);
      const storedGoals = localStorage.getItem(`goals_${user.id}`);

      if (storedMoodData) setMoodData(JSON.parse(storedMoodData));
      if (storedActivityData) setActivityData(JSON.parse(storedActivityData));
      if (storedGoals) setGoals(JSON.parse(storedGoals));
    }
  }, [user]);

  const saveData = () => {
    if (user) {
      localStorage.setItem(`moodData_${user.id}`, JSON.stringify(moodData));
      localStorage.setItem(`activityData_${user.id}`, JSON.stringify(activityData));
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(goals));
    }
  };

  const addMoodEntry = (entry) => {
    setMoodData(prev => [...prev, entry]);
    saveData();
  };

  const addActivityEntry = (entry) => {
    setActivityData(prev => [...prev, entry]);
    saveData();
  };

  const addGoal = (text) => {
    setGoals(prev => [...prev, { id: Date.now(), text, completed: false }]);
    saveData();
  };

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
    saveData();
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    saveData();
  };

  return (
    <DataContext.Provider value={{
      moodData,
      activityData,
      goals,
      addMoodEntry,
      addActivityEntry,
      addGoal,
      toggleGoal,
      deleteGoal
    }}>
      {children}
    </DataContext.Provider>
  );
};