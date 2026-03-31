import { useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ShieldCheck, Factory, Store } from 'lucide-react';
import PriceChart from '@/components/PriceChart';
import type { PriceData } from '@/data/mockData';

interface CountryAnalyticsSheetProps {
  countryData: PriceData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CountryAnalyticsSheet({
  countryData,
  open,
  onOpenChange,
}: CountryAnalyticsSheetProps) {
  
  // Mock data specifically geared toward the selected country
  const qualityMetrics = useMemo(() => {
    // Generate some stable random-looking numbers based on the country code
    const seed = countryData ? countryData.code.charCodeAt(0) : 1;
    const exportGrade = 50 + (seed % 20); // 50 to 69%
    const localGrade = 20 + (seed % 10);  // 20 to 29%
    const processing = 100 - exportGrade - localGrade; // Remaining %

    return [
      { name: 'Export Grade (Class I)', value: exportGrade, color: 'bg-emerald-500' },
      { name: 'Local Market (Class II)', value: localGrade, color: 'bg-yellow-500' },
      { name: 'Processing (Oil/Guac)', value: processing, color: 'bg-orange-500' },
    ];
  }, [countryData]);

  const topSellers = useMemo(() => {
    const prefixes = ['Agro', 'Verde', 'Global', 'Fresh', 'Prime', 'Nature'];
    const suffixes = ['Export', 'Farms', 'Produce', 'Harvest', 'Growers'];
    
    if (!countryData) return [];
    
    return Array.from({ length: 4 }).map((_, i) => {
      const code = countryData.code;
      const seed = code.charCodeAt(0) + i;
      const name = `${prefixes[seed % prefixes.length]} ${suffixes[(seed + 2) % suffixes.length]} ${code}`;
      const volume = 1000 + (seed * 123) % 4000;
      return { name, volume };
    });
  }, [countryData]);

  if (!countryData) return null;

  const isPositive = countryData.change >= 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="w-full sm:max-w-5xl mx-auto rounded-t-3xl max-h-[90vh] overflow-y-auto pb-10 px-6 sm:px-10">
        <SheetHeader className="mb-6 relative">
          <div className="flex items-center justify-between mt-4 pr-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SheetTitle className="text-2xl">{countryData.country}</SheetTitle>
                <Badge variant="secondary" className="font-mono">{countryData.code}</Badge>
              </div>
              <SheetDescription>
                Detailed avocado market intelligence and distributor analytics.
              </SheetDescription>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-foreground tabular-nums">
                ${countryData.price.toFixed(2)}
              </p>
              <div
                className={`flex items-center justify-end gap-1 text-sm font-medium ${
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}
                {countryData.change.toFixed(1)}%
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Price Chart Section */}
          <section>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Price Trend (USD/kg)
            </h3>
            <div className="rounded-xl border border-border overflow-hidden">
               <PriceChart title={`${countryData.code} Benchmark`} height={250} compact />
            </div>
          </section>

          {/* Quality Metrics Breakdown */}
          <section>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Harvest Quality Breakdown
            </h3>
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <div className="flex h-4 rounded-full overflow-hidden mb-4">
                {qualityMetrics.map((metric) => (
                  <div 
                    key={metric.name} 
                    className={`${metric.color} h-full`} 
                    style={{ width: `${metric.value}%` }} 
                  />
                ))}
              </div>
              <div className="space-y-2">
                {qualityMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm ${metric.color}`} />
                      <span className="text-muted-foreground">{metric.name}</span>
                    </div>
                    <span className="font-bold tabular-nums">{metric.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Top Sellers / Exporters */}
          <section>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" />
              Top Regional Wholesalers
            </h3>
            <div className="border border-border rounded-xl divide-y divide-border">
              {topSellers.map((seller, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Factory className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{seller.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block">Est. Monthly Vol</span>
                    <span className="font-semibold text-sm tabular-nums">{seller.volume.toLocaleString()} MT</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
