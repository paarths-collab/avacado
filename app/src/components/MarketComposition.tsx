import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const TIERS = [
  { 
    key: 'skin',
    label: 'Skin (Premium)', 
    short: 'PREMIUM',
    color: '#1a3a2a',
    glow: 'rgba(26,58,42,0.15)'
  },
  { 
    key: 'flesh',
    label: 'Flesh (Standard)', 
    short: 'COMMERCIAL',
    color: '#4a9960',
    glow: 'rgba(74,153,96,0.15)'
  },
  { 
    key: 'pit',
    label: 'Pit (Core)', 
    short: 'WHOLESALE',
    color: '#6b7e3d',
    glow: 'rgba(107,126,61,0.15)'
  },
];

const BASE_VALUES = { skin: 15, flesh: 50, pit: 35 };

export default function MarketComposition() {
  const [values, setValues] = useState(BASE_VALUES);

  const total = values.skin + values.flesh + values.pit;
  const fleshPct = values.flesh / total;
  const pitPct = values.pit / total;

  // SVG circle radii — outer, mid, inner
  const cx = 110;
  const cy = 110;
  const maxR = 96;
  // Skin fills the outermost ring, flesh the middle, pit the center
  const pitR = maxR * Math.sqrt(pitPct);
  const fleshR = maxR * Math.sqrt(pitPct + fleshPct);
  const skinR = maxR; // outer layer always full radius, skin is the shell

  const handleChange = (key: keyof typeof values, val: number[]) => {
    setValues(prev => ({ ...prev, [key]: val[0] }));
  };

  const randomize = () => {
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 40) + 10;
    const c = Math.floor(Math.random() * 40) + 10;
    setValues({ skin: a, flesh: b, pit: c });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Cross-Section SVG */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
            {/* Outer glow filter */}
            <defs>
              <filter id="glow-skin">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-flesh">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="grad-skin" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#2a5a3a" />
                <stop offset="100%" stopColor="#0f1f14" />
              </radialGradient>
              <radialGradient id="grad-flesh" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#7bc87e" />
                <stop offset="100%" stopColor="#3d8050" />
              </radialGradient>
              <radialGradient id="grad-pit" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#a08040" />
                <stop offset="100%" stopColor="#5a3d18" />
              </radialGradient>
            </defs>

            {/* Skin — outermost full disc (appears as ring due to flesh on top) */}
            <motion.circle
              cx={cx} cy={cy}
              r={skinR}
              fill="url(#grad-skin)"
              animate={{ r: skinR }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            />

            {/* Flesh — sits on top of skin */}
            <motion.circle
              cx={cx} cy={cy}
              r={fleshR}
              fill="url(#grad-flesh)"
              animate={{ r: fleshR }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            />

            {/* Pit — innermost */}
            <motion.circle
              cx={cx} cy={cy}
              r={pitR}
              fill="url(#grad-pit)"
              animate={{ r: pitR }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            />

            {/* Pit highlight */}
            <motion.ellipse
              cx={cx - 10} cy={cy - 14}
              rx={pitR * 0.28}
              ry={pitR * 0.18}
              fill="rgba(255,255,255,0.12)"
              animate={{ rx: pitR * 0.28, ry: pitR * 0.18 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            />

            {/* Flesh highlight */}
            <motion.ellipse
              cx={cx - 18} cy={cy - 28}
              rx={fleshR * 0.2}
              ry={fleshR * 0.1}
              fill="rgba(255,255,255,0.1)"
              animate={{ rx: fleshR * 0.2, ry: fleshR * 0.1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            />

            {/* Outer ring border */}
            <circle
              cx={cx} cy={cy} r={skinR}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </svg>

          {/* Percentage rings — floating labels */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">TOTAL</p>
              <p className="text-xl font-mono font-bold text-white">{total}</p>
              <p className="text-[8px] font-mono text-white/30 uppercase tracking-wider">units</p>
            </div>
          </div>
        </div>

        {/* Side legend */}
        <div className="ml-6 flex flex-col gap-4">
          {TIERS.map((tier, i) => {
            const pct = Math.round((values[tier.key as keyof typeof values] / total) * 100);
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: tier.color }} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{tier.short}</p>
                  <p className="text-xl font-mono font-bold text-foreground tabular-nums leading-tight">
                    {pct}<span className="text-sm text-muted-foreground">%</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-4 pt-2 border-t border-foreground/5">
        {TIERS.map((tier) => (
          <div key={tier.key} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{tier.short}</span>
              <span className="text-xs font-mono font-bold text-foreground tabular-nums">{values[tier.key as keyof typeof values]}</span>
            </div>
            <Slider
              value={[values[tier.key as keyof typeof values]]}
              min={5}
              max={100}
              step={1}
              onValueChange={(val) => handleChange(tier.key as keyof typeof values, val)}
              className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
            />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={randomize}
        className="w-full border-foreground/10 hover:bg-secondary text-[10px] font-bold uppercase tracking-widest h-9 rounded-lg transition-all flex items-center gap-2"
      >
        <RefreshCw className="w-3 h-3" />
        Simulate Market Shift
      </Button>
    </div>
  );
}
