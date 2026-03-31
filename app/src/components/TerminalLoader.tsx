import { motion } from 'framer-motion';

export default function TerminalLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="relative w-16 h-16">
        {/* Outer Ring (Skin) */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle Ring (Flesh) */}
        <motion.div
          className="absolute inset-2 border-t-2 border-primary rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Core (Pit) */}
        <motion.div
          className="absolute inset-[35%] bg-primary/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse">
          Synchronizing Data
        </p>
        <p className="text-[8px] font-mono font-medium text-muted-foreground uppercase tracking-widest mt-1 opacity-50">
          Terminal Node 0x42A...
        </p>
      </div>
    </div>
  );
}
