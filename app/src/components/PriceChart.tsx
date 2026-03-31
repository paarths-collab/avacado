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
  height?: number;
  compact?: boolean;
  countryCode?: string;
  externalTimeRange?: '7d' | '30d' | '1y';
}

type TimeRange = '7d' | '30d' | '1y';

export default function PriceChart({
  title = 'Price Trend',
  showTimeSelector = true,
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
      <Card className={`border-0 shadow-card bg-card overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 flex flex-col' : ''}`}>
      {!compact && (
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {showTimeSelector && (
              <div className="flex gap-1">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={timeRange === option.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeRange(option.value)}
                    className={`text-xs h-8 px-3 ${
                      timeRange === option.value
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent className={`${compact ? 'p-4' : 'pt-0'} relative ${isExpanded ? 'flex-1 min-h-0' : ''}`}>
        <ResponsiveContainer width="100%" height={isExpanded ? '100%' : height}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/30" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              dy={10}
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#4CAF50"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    </>
  );
}
