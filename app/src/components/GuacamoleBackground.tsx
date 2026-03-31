import { motion } from 'framer-motion';

export default function GuacamoleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#FDFCF8]">
      <motion.div 
        animate={{ 
          x: [0, 80, 0], 
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-15%] w-[60vw] h-[60vw] bg-[#E8F5E9] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 dark:opacity-20"
      />
      <motion.div 
        animate={{ 
          x: [0, -70, 0], 
          y: [0, 90, 0],
          scale: [1, 1.25, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-[#D1FAE5] rounded-full mix-blend-multiply filter blur-[120px] opacity-50 dark:opacity-15"
      />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#FEF3C7] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 dark:opacity-5"
      />
    </div>
  );
}
