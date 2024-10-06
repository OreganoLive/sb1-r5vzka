import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivitySummary = ({ data }) => {
  const chartData = {
    labels: data.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Steps',
        data: data.map(entry => entry.steps),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Screen Time (hours)',
        data: data.map(entry => entry.screenTime),
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ActivitySummary;