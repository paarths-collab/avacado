import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataTick } from '@/hooks/useDataTick';
import type { PriceData } from '@/data/mockData';

interface PriceCardProps {
  data: PriceData;
  onClick?: () => void;
}

export default function PriceCard({ data, onClick }: PriceCardProps) {
  const isPositive = data.change >= 0;
  const { isTickUp, isTickDown } = useDataTick(data.price);

  // Generate stable mock history based on the price and change
  const sparklineData = useMemo(() => {
    const points = 12;
    const history = [];
    let currentPrice = data.price * (1 - data.change / 100);
    const step = (data.price - currentPrice) / points;
    
    for (let i = 0; i < points; i++) {
        const variance = (Math.random() - 0.5) * 0.05;
        history.push({ value: currentPrice + variance });
        currentPrice += step;
    }
    history.push({ value: data.price });
    return history;
  }, [data.price, data.change]);

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border border-foreground/10 bg-card shadow-none hover:border-foreground/20 transition-all duration-300 rounded-leaf relative"
    >
      <AnimatePresence>
        {isTickUp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-emerald-500 pointer-events-none z-10"
          />
        )}
        {isTickDown && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Country */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className={`w-1 h-1 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {data.country}
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono font-bold text-foreground tracking-tight tabular-nums">
                ${data.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider font-mono">/KG</span>
            </div>
          </div>

          {/* Change Badge */}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold tabular-nums border ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                : 'bg-red-500/10 text-red-600 border-red-500/20'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{isPositive ? '+' : ''}{data.change.toFixed(1)}%</span>
          </div>
        </div>

        {/* Recharts Sparkline - Refined for Institutional Look */}
        <div className="h-12 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`gradient-${data.code}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#059669' : '#DC2626'} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={isPositive ? '#059669' : '#DC2626'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#059669' : '#DC2626'}
                strokeWidth={1.2}
                fill={`url(#gradient-${data.code})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
