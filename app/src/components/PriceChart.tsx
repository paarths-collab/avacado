import { useState, useMemo, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Maximize2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateChartData } from '@/data/mockData';

interface PriceChartProps {
  title?: string;
  showTimeSelector?: boolean;
  showExpand?: boolean;
  height?: number;
  compact?: boolean;
  countryCode?: string;
  externalTimeRange?: '7d' | '30d' | '1y';
}

type TimeRange = '7d' | '30d' | '1y';

export default function PriceChart({
  title = 'Price Trend',
  showTimeSelector = true,
  showExpand = true,
  height = 350,
  compact = false,
  countryCode = 'all',
  externalTimeRange,
}: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  
  // Sync internal timeRange with external prop when it changes
  useEffect(() => {
    if (externalTimeRange) {
      setTimeRange(externalTimeRange);
    }
  }, [externalTimeRange]);

  const [isExpanded, setIsExpanded] = useState(false);
  const data = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '1y' ? 365 : 30;
    const seed = countryCode === 'all' ? 0 : countryCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return generateChartData(days, seed);
  }, [timeRange, countryCode]);

  const timeOptions: { value: TimeRange; label: string }[] = [
    { value: '7d', label: '7D' },
    { value: '30d', label: '1M' },
    { value: '1y', label: '1Y' },
  ];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-semibold text-primary">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsExpanded(false)} />
      )}
      <Card className={`border-0 shadow-premium bg-card overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[85vh] max-w-6xl z-50 flex flex-col scale-100 opacity-100 shadow-2xl' 
          : 'relative shadow-card scale-100 opacity-100'
      }`}>
      {!compact && (
        <CardHeader className={`flex flex-row items-center justify-between transition-all duration-300 ${isExpanded ? 'p-8 pb-4' : 'pb-2'}`}>
          <div className="flex flex-col gap-1">
            <CardTitle className={`${isExpanded ? 'text-2xl' : 'text-lg'} font-bold text-foreground tracking-tight`}>
              {title}
            </CardTitle>
            {isExpanded && (
              <p className="text-sm text-muted-foreground font-medium">Institutional Market Data Stream • Real-time Sync</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {showTimeSelector && (
              <div className="flex bg-muted/50 p-1 rounded-xl">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => setTimeRange(option.value)}
                    className={`text-xs font-bold h-8 px-4 rounded-lg transition-all ${
                      timeRange === option.value
                        ? 'bg-primary text-white shadow-sm scale-105'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
            {showExpand && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`h-9 w-9 rounded-xl border-foreground/5 shadow-sm transition-all hover:scale-105 ${isExpanded ? 'bg-primary/5 border-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {isExpanded ? <X className="h-5 w-5" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={`${compact ? 'p-4' : 'pt-0'} relative ${isExpanded ? 'flex-1 p-8 pt-4 min-h-0' : ''}`}>
        <ResponsiveContainer width="100%" height="100%" minHeight={isExpanded ? 0 : height}>
          <AreaChart 
            data={data} 
            margin={isExpanded 
              ? { top: 20, right: 30, left: 10, bottom: 40 } 
              : { top: 10, right: 10, left: 0, bottom: 0 }
            }
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="currentColor" 
              className="text-border/30" 
              vertical={false} 
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'hsl(var(--muted-foreground))', 
                fontSize: isExpanded ? 12 : 11,
                fontWeight: isExpanded ? 600 : 500
              }}
              dy={15}
              minTickGap={isExpanded ? 40 : 30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'hsl(var(--muted-foreground))', 
                fontSize: isExpanded ? 12 : 11,
                fontWeight: isExpanded ? 600 : 500
              }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              dx={-15}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4CAF50"
              strokeWidth={isExpanded ? 3 : 2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    </>
  );
}
