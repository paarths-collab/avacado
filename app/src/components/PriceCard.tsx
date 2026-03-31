import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import type { PriceData } from '@/data/mockData';

interface PriceCardProps {
  data: PriceData;
  onClick?: () => void;
}

export default function PriceCard({ data, onClick }: PriceCardProps) {
  const isPositive = data.change >= 0;

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
      className="group cursor-pointer overflow-hidden border border-border/50 bg-card shadow-none hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Country */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {data.country}
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-1 tabular-nums">
              <span className="text-2xl font-bold text-foreground">
                ${data.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">/KG</span>
            </div>
          </div>

          {/* Change Badge */}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold tabular-nums border ${
              isPositive
                ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100'
                : 'bg-red-50/50 text-red-600 border-red-100'
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

        {/* Recharts Sparkline */}
        <div className="h-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`gradient-${data.code}`} x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? '#10b981' : '#ef4444'} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? '#10b981' : '#ef4444'} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                strokeWidth={1.5}
                fillOpacity={1}
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
