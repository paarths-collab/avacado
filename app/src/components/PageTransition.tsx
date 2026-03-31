import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
      transition={{ 
        duration: 0.45, 
        ease: [0.23, 1, 0.32, 1] // Custom quint ease for smooth "peeling"
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
