import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Filter, Download, Globe, Calendar, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import PriceChart from '@/components/PriceChart';
import MapChart from '@/components/MapChart';
import TerminalLoader from '@/components/TerminalLoader';
import CountryAnalyticsSheet from '@/components/CountryAnalyticsSheet';
import { globalPrices } from '@/data/mockData';
import type { PriceData } from '@/data/mockData';

export default function Prices() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [selectedCountryDetails, setSelectedCountryDetails] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const filteredPrices = useMemo(() => {
    if (selectedCountry === 'all') return globalPrices;
    return globalPrices.filter((p) => p.code === selectedCountry);
  }, [selectedCountry]);

  const averagePrice = useMemo(() => {
    const sum = filteredPrices.reduce((acc, p) => acc + p.price, 0);
    return sum / filteredPrices.length;
  }, [filteredPrices]);

  const averageChange = useMemo(() => {
    const sum = filteredPrices.reduce((acc, p) => acc + p.change, 0);
    return sum / filteredPrices.length;
  }, [filteredPrices]);

  const stats = [
    {
      label: 'Average Price',
      value: `$${averagePrice.toFixed(2)}`,
      subtext: 'per kg',
      icon: TrendingUp,
    },
    {
      label: 'Price Change',
      value: `${averageChange >= 0 ? '+' : ''}${averageChange.toFixed(1)}%`,
      subtext: 'vs last period',
      icon: averageChange >= 0 ? TrendingUp : TrendingDown,
      isPositive: averageChange >= 0,
    },
    {
      label: 'Markets Tracked',
      value: String(globalPrices.length),
      subtext: 'countries',
      icon: Globe,
    },
    {
      label: 'Last Updated',
      value: 'Just now',
      subtext: 'real-time data',
      icon: Calendar,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Global Avocado Prices
              </h1>
              <p className="text-sm font-medium text-muted-foreground mt-1 tracking-wide opacity-80 uppercase">
                Real-time price tracking and market analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
                className="bg-white border-foreground/10 hover:bg-secondary/50 rounded-lg h-10 px-5 text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-foreground/10 hover:bg-secondary/50 rounded-lg h-10 px-5 text-[10px] font-bold uppercase tracking-widest transition-all">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-foreground/10 hover:bg-secondary/50 rounded-lg h-10 px-5 text-[10px] font-bold uppercase tracking-widest transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex items-center justify-center min-h-[600px]">
            <TerminalLoader />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-foreground/10 shadow-none bg-card rounded-xl overflow-hidden hover:border-foreground/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <p className={`text-2xl font-mono font-bold tabular-nums tracking-tight ${
                      stat.isPositive !== undefined
                        ? stat.isPositive
                          ? 'text-emerald-600'
                          : 'text-red-600'
                        : 'text-foreground'
                    }`}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 opacity-60 italic">{stat.subtext}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.isPositive !== undefined
                      ? stat.isPositive
                        ? 'bg-emerald-500/10'
                        : 'bg-red-500/10'
                      : 'bg-primary/10'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.isPositive !== undefined
                        ? stat.isPositive
                          ? 'text-emerald-600'
                          : 'text-red-600'
                        : 'text-primary'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {globalPrices.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px] bg-card">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <PriceChart 
            title={selectedCountry === 'all' ? 'Global Price Trend' : `${selectedCountry} Price Trend`} 
            height={400} 
            countryCode={selectedCountry}
            externalTimeRange={timeRange as any}
          />
          <MapChart 
            title="Global Price Distribution" 
            height={400} 
            highlightCountryCode={selectedCountry}
          />
        </div>

        {/* Price Table */}
        <Card className="border border-foreground/10 shadow-none bg-card overflow-hidden rounded-leaf">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Detailed Price Data</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Country</TableHead>
                    <TableHead className="font-semibold">Code</TableHead>
                    <TableHead className="font-semibold text-right">Price (USD/kg)</TableHead>
                    <TableHead className="font-semibold text-right">24h Change</TableHead>
                    <TableHead className="font-semibold text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.map((price) => (
                    <TableRow 
                      key={price.code} 
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedCountryDetails(price)}
                    >
                      <TableCell className="font-medium">{price.country}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">
                          {price.code}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${price.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-medium ${
                            price.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {price.change >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {price.change >= 0 ? '+' : ''}
                          {price.change.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-0.5 h-6">
                          {Array.from({ length: 7 }).map((_, i) => {
                            const height = 20 + Math.random() * 80;
                            const isUp = Math.random() > 0.4;
                            return (
                              <div
                                key={i}
                                className={`w-1.5 rounded-sm ${
                                  isUp ? 'bg-emerald-400' : 'bg-red-400'
                                }`}
                                style={{ height: `${height}%` }}
                              />
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </>
    )}
  </div>
      
      <CountryAnalyticsSheet 
        countryData={selectedCountryDetails}
        open={!!selectedCountryDetails}
        onOpenChange={(open) => !open && setSelectedCountryDetails(null)}
      />
    </main>
  );
}
