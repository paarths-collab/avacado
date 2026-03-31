import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2, X } from 'lucide-react';
import { globalPrices } from '@/data/mockData';
import type { PriceData } from '@/data/mockData';

// World map GeoJSON URL
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface MapChartProps {
  title?: string;
  height?: number;
  highlightCountryCode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GeographyType {
  rsmKey: string;
  properties: {
    ISO_A3: string;
  };
}

export default function MapChart({
  title = 'Global Price Map',
  height = 450,
  highlightCountryCode = 'all',
}: MapChartProps) {
  const [hoveredCountry, setHoveredCountry] = useState<PriceData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<PriceData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPos({ x: event.clientX + 15, y: event.clientY - 10 });
  };

  const getPriceColor = (price: number) => {
    if (price < 2.5) return '#4CAF50';
    if (price < 3.5) return '#81C784';
    if (price < 4.5) return '#FFB74D';
    return '#FF8A65';
  };

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsExpanded(false)} />
      )}
      <Card className={`border-0 shadow-card bg-card overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 flex flex-col' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent className={`pt-0 relative ${isExpanded ? 'flex-1 min-h-0' : ''}`}>
          <div 
            className="relative rounded-xl overflow-hidden bg-muted/20 w-full"
            style={{ height: isExpanded ? '100%' : height }}
            onMouseMove={handleMouseMove}
          >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [0, 20],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup zoom={1} maxZoom={4} minZoom={1}>
              <Geographies geography={geoUrl}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {({ geographies }: { geographies: GeographyType[] }) =>
                  geographies.map((geo) => {
                    const countryCode = geo.properties.ISO_A3;
                    const priceData = globalPrices.find(
                      (p) => p.code === countryCode
                    );
                    const isHighlighted = highlightCountryCode === 'all' || highlightCountryCode === countryCode;
                    const baseColor = priceData ? getPriceColor(priceData.price) : '#e5e7eb';

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo as unknown as string}
                        fill={isHighlighted ? baseColor : 'hsl(var(--muted))'}
                        stroke="hsl(var(--border))"
                        opacity={isHighlighted ? 1 : 0.2}
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: 'none',
                            transition: 'all 0.3s',
                          },
                          hover: {
                            fill: priceData && isHighlighted ? '#2E7D32' : (isHighlighted ? baseColor : '#f3f4f6'),
                            outline: 'none',
                            cursor: priceData && isHighlighted ? 'pointer' : 'default',
                          },
                          pressed: {
                            outline: 'none',
                          },
                        }}
                        onMouseEnter={() => {
                          if (priceData) {
                            setHoveredCountry(priceData);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(null);
                        }}
                        onClick={() => {
                          if (priceData) {
                            setSelectedCountry(priceData);
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Price Markers */}
              {globalPrices
                .filter(country => highlightCountryCode === 'all' || highlightCountryCode === country.code)
                .map((country) => (
                <Marker
                  key={country.code}
                  coordinates={country.coordinates}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => setSelectedCountry(country)}
                  className="cursor-pointer"
                >
                  <circle
                    r={6}
                    fill="#2E7D32"
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                  <circle
                    r={12}
                    fill="#2E7D32"
                    opacity={0.2}
                    className="animate-pulse pointer-events-none"
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/50">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Price per kg (USD)
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#4CAF50]" />
                <span className="text-xs text-muted-foreground">&lt;$2.5</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#81C784]" />
                <span className="text-xs text-muted-foreground">$2.5-3.5</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#FFB74D]" />
                <span className="text-xs text-muted-foreground">$3.5-4.5</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#FF8A65]" />
                <span className="text-xs text-muted-foreground">&gt;$4.5</span>
              </div>
            </div>
          </div>

          {/* Flash Card */}
          {selectedCountry && (
            <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-md rounded-xl p-5 shadow-2xl border border-border/60 min-w-[220px] z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-foreground text-lg tracking-tight">{selectedCountry.country}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 -mt-1 -mr-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedCountry(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Current Price</p>
                  <p className="text-3xl font-bold text-primary tabular-nums">
                    ${selectedCountry.price.toFixed(2)}
                    <span className="text-sm font-medium text-muted-foreground ml-1">/kg</span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Price Trend (30D)</p>
                  <div className={`inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-md text-sm ${
                    selectedCountry.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {selectedCountry.change >= 0 ? '+' : ''}{selectedCountry.change.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tooltip */}
        {hoveredCountry && (
          <div
            className="fixed z-50 bg-card p-3 rounded-lg shadow-xl border border-border pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
            }}
          >
            <p className="font-semibold text-foreground">{hoveredCountry.country}</p>
            <p className="text-lg font-bold text-primary">
              ${hoveredCountry.price.toFixed(2)}/kg
            </p>
            <p
              className={`text-xs font-medium ${
                hoveredCountry.change >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {hoveredCountry.change >= 0 ? '+' : ''}
              {hoveredCountry.change.toFixed(1)}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
