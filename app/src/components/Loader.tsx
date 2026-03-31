import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFCF8]"
        >
          {/* Guacamole Background Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-[#E8F5E9] rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative flex flex-col items-center">
            {/* Bopping Avocado Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2
              }}
              className="relative"
            >
              <Logo size={140} className="shadow-2xl shadow-green-900/10" />
              
              {/* Inner Glow Pulse */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              />
            </motion.div>
            
            {/* Loading Narrative */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1 h-1 bg-primary rounded-full animate-ping" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  Synchronizing Market
                </p>
              </div>
              <p className="text-[8px] font-mono font-medium text-muted-foreground uppercase tracking-widest opacity-40">
                Secure Terminal Connection established
              </p>
            </motion.div>
            
            {/* Progress Micro-bar */}
            <div className="mt-8 w-32 h-[1px] bg-primary/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="h-full w-1/2 bg-primary/40"
               />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
