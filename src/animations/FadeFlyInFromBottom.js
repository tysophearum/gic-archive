import React from 'react';
import { motion } from 'framer-motion';

const FadeFlyInFromBottom = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial position and opacity
      animate={{ opacity: 1, y: 0 }}   // Animation to fade in and fly from bottom
      transition={{ duration: 0.5 }}   // Duration of animation
      style={{ position: 'absolute', bottom: 0, width: '100%' }} // Position at bottom
    >
      {children}
    </motion.div>
  );
};

export default FadeFlyInFromBottom;
