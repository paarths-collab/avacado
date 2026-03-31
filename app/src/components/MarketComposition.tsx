import { useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const baseData = [
  { name: 'Skin (Premium)', value: 15, fill: 'var(--ripeness-saturated)' },
  { name: 'Flesh (Standard)', value: 50, fill: 'var(--ripeness-optimal)' },
  { name: 'Pit (Core)', value: 35, fill: 'var(--ripeness-unripe)' },
];

export default function MarketComposition() {
  const [data, setData] = useState(baseData);

  const handleSliderChange = (index: number, newValue: number[]) => {
    const newData = [...data];
    newData[index].value = newValue[0];
    setData(newData);
  };

  const randomize = () => {
    setData(data.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 60) + 10
    })));
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex-1 min-h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="20%" 
            outerRadius="100%" 
            barSize={32} 
            data={data}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <RadialBar
                key={`bar-${index}`}
                background
                dataKey="value"
                cornerRadius={16}
              >
                <Cell fill={entry.fill} className="transition-all duration-700 ease-in-out" />
              </RadialBar>
            ))}
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Monospace Legend Overlay */}
        <div className="absolute top-0 right-0 p-4 flex flex-col gap-2 pointer-events-none">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.name}</p>
                <p className="text-sm font-mono font-bold text-foreground tabular-nums">{item.value}%</p>
              </div>
              <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: item.fill }} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {data.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.name}</span>
                <span className="text-xs font-mono font-bold text-foreground">{item.value}%</span>
              </div>
              <Slider 
                value={[item.value]} 
                max={100} 
                step={1} 
                onValueChange={(val) => handleSliderChange(i, val)}
                className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary"
              />
            </div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          onClick={randomize}
          className="w-full border-foreground/10 hover:bg-secondary text-[10px] font-bold uppercase tracking-widest h-10 rounded-lg transition-all"
        >
          Simulate Market Shift
        </Button>
      </div>
    </div>
  );
}
