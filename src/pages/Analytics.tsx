import React from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useData } from '../contexts/DataContext';
import InsightCard from '../components/InsightCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { moodData, activityData } = useData();

  const moodChartData = {
    labels: moodData.slice(-7).map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood',
        data: moodData.slice(-7).map(entry => {
          const moodValues = { Joyful: 5, Content: 4, Neutral: 3, Anxious: 2, Sad: 1, Angry: 0 };
          return moodValues[entry.mood];
        }),
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const activityChartData = {
    labels: activityData.slice(-7).map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Steps',
        data: activityData.slice(-7).map(entry => entry.steps),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Screen Time (hours)',
        data: activityData.slice(-7).map(entry => entry.screenTime),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const correlationData = {
    datasets: [
      {
        label: 'Mood vs Steps',
        data: moodData.slice(-30).map((entry, index) => ({
          x: activityData[index]?.steps || 0,
          y: { Joyful: 5, Content: 4, Neutral: 3, Anxious: 2, Sad: 1, Angry: 0 }[entry.mood],
        })),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Overview',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const correlationOptions = {
    ...options,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Steps',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Mood',
        },
        beginAtZero: true,
        max: 5,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
      <h1 className="text-4xl font-bold mb-8 text-secondary-800">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-secondary-700">Mood Trends</h2>
          <Line data={moodChartData} options={options} />
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-secondary-700">Activity Trends</h2>
          <Bar data={activityChartData} options={options} />
        </motion.div>
      </div>
      <motion.div variants={itemVariants} className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-secondary-700">Mood-Activity Correlation</h2>
        <Scatter data={correlationData} options={correlationOptions} />
      </motion.div>
      <motion.div variants={itemVariants} className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-secondary-700">Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            title="Mood-Activity Correlation"
            description="There's a positive correlation between your daily step count and mood. On days with higher step counts, you tend to report more positive moods."
          />
          <InsightCard
            title="Screen Time Impact"
            description="Your mood tends to be lower on days with higher screen time. Consider setting limits on your device usage to improve your overall well-being."
          />
          <InsightCard
            title="Weekend Effect"
            description="Your mood is generally more positive on weekends. Try to incorporate more weekend-like activities into your weekdays to maintain a more consistent mood."
          />
          <InsightCard
            title="Consistency is Key"
            description="Regular engagement in activities like meditation and reading is associated with more stable mood patterns. Aim for consistency in your wellness routines."
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;