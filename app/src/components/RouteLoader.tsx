import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function RouteLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // Only show if actually navigating to a different page
    if (pathname !== prevPath) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setPrevPath(pathname);
      }, 900); // short, snappy loader for page transitions
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl"
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.4 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none"
          />

          {/* Logo bop */}
          <motion.div
            initial={{ y: 12, scale: 0.85, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -12, scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="relative"
          >
            <Logo size={72} className="shadow-xl shadow-primary/10" />

            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-primary/30"
            />
          </motion.div>

          {/* Scanning line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 w-20 h-[1px] bg-primary/20 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 bg-primary/60"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
