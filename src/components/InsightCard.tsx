import React from 'react';
import { motion } from 'framer-motion';

const InsightCard = ({ title, description }) => {
  return (
    <motion.div
      className="bg-secondary-100 p-4 rounded-lg shadow"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <h3 className="text-lg font-semibold mb-2 text-secondary-800">{title}</h3>
      <p className="text-secondary-600">{description}</p>
    </motion.div>
  );
};

export default InsightCard;