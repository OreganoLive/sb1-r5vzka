import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Search, Bell } from 'lucide-react';
import MoodChart from '../components/MoodChart';
import ActivitySummary from '../components/ActivitySummary';

const Dashboard = () => {
  const { moodData, activityData } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMoodData = moodData.filter(entry =>
    entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.reflection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActivityData = activityData.filter(entry =>
    entry.activities.some(activity => activity.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search"
              className="bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button className="bg-white p-2 rounded-full">
            <Bell size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Mood Overview</h2>
          <MoodChart data={filteredMoodData.slice(-7)} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          <ActivitySummary data={filteredActivityData.slice(-7)} />
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow text-white">
          <h2 className="text-xl font-semibold mb-4">Earn Free Rewards!</h2>
          <p className="mb-4">Complete daily check-ins and earn points towards wellness products.</p>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-3">Date</th>
              <th className="pb-3">Mood</th>
              <th className="pb-3">Activities</th>
              <th className="pb-3">Reflection</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoodData.slice(-5).map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="py-3">{entry.mood}</td>
                <td className="py-3">{filteredActivityData[index]?.activities.join(', ')}</td>
                <td className="py-3">{entry.reflection.substring(0, 50)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;