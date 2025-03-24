import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        rotate: 360 
      }}
      transition={{ 
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`
        ${sizes[size]} 
        border-4 
        ${colors[color]} 
        border-t-transparent 
        rounded-full
      `}
    />
  );
};

export default LoadingSpinner; 