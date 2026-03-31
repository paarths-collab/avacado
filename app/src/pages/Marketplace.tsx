import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Package, Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { marketplaceItems } from '@/data/mockData';
import type { MarketplaceItem } from '@/data/mockData';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variety.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        item.pricePerKg >= priceRange[0] && item.pricePerKg <= priceRange[1];

      return matchesSearch && matchesPrice;
    });
  }, [searchQuery, priceRange]);

  const handleContact = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setShowContactDialog(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Avocado Marketplace
              </h1>
              <p className="text-sm font-medium text-muted-foreground mt-1 tracking-wide opacity-80 uppercase">
                Connect directly with verified suppliers worldwide
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                {marketplaceItems.length} Verified Suppliers
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="border border-foreground/10 shadow-none bg-card sticky top-24 rounded-leaf">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Market Filters</h3>
                </div>

                {/* Search */}
                <div className="mb-8">
                  <label className="text-[10px] font-bold text-muted-foreground mb-2 block uppercase tracking-widest">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                    <Input
                      placeholder="Origin, variety..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-foreground/10 h-11 text-xs font-medium rounded-lg"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <label className="text-[10px] font-bold text-muted-foreground mb-4 block uppercase tracking-widest">
                    Price Range: <span className="text-foreground">${priceRange[0]} - ${priceRange[1]}</span>
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Quick Stats */}
                <div className="pt-6 border-t border-foreground/5">
                  <h4 className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-widest leading-none">
                    Market Intelligence
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">Global Minimum</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600">
                        ${Math.min(...marketplaceItems.map((i) => i.pricePerKg)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">Terminal High</span>
                      <span className="text-[11px] font-mono font-bold text-foreground">
                        ${Math.max(...marketplaceItems.map((i) => i.pricePerKg)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-muted-foreground">Supplier Alpha</span>
                      <span className="text-[11px] font-bold text-amber-600">
                        {(marketplaceItems.reduce((a, b) => a + b.rating, 0) / marketplaceItems.length).toFixed(1)} ★
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                Tracking <span className="text-foreground">{filteredItems.length}</span> Active Listings
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Order by:</span>
                <select className="text-[10px] font-bold uppercase tracking-widest border border-foreground/10 rounded-lg px-3 py-1.5 bg-white text-foreground focus:ring-0 outline-none">
                  <option>Price Ascending</option>
                  <option>Price Descending</option>
                  <option>Rating (Top)</option>
                  <option>Volume</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border border-foreground/10 shadow-none hover:border-foreground/20 transition-all duration-300 rounded-leaf bg-card relative"
                >
                  <CardContent className="p-0">
                    {/* Image Placeholder */}
                    <div className="relative h-44 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a2e1c] dark:to-[#0f1d10] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                           style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0)', backgroundSize: '12px 12px' }} />
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/90 dark:bg-black/90 flex items-center justify-center shadow-premium transition-transform duration-500 group-hover:scale-110">
                          <Package className="w-8 h-8 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-white/90 dark:bg-black/90 text-[10px] font-bold uppercase tracking-widest text-primary border-primary/20">
                          {item.variety}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-3 py-1 rounded-full border border-foreground/10 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-[10px] font-bold">{item.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Farm Name */}
                      <h3 className="text-md font-display font-bold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
                        {item.farmName}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mb-6 opacity-70">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {item.location}, {item.country}
                        </span>
                      </div>

                      {/* Price & Quantity Row */}
                      <div className="flex items-end justify-between mb-6 bg-muted/5 p-3 rounded-xl border border-foreground/5">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Price/KG</p>
                          <p className="text-2xl font-mono font-bold text-foreground tabular-nums tracking-tighter">
                            ${item.pricePerKg.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Lot Size</p>
                          <p className="text-sm font-mono font-bold text-foreground tabular-nums">
                            {item.quantity.toLocaleString()}kg
                          </p>
                        </div>
                      </div>

                      {/* Contact Button */}
                      <Button
                        onClick={() => handleContact(item)}
                        className="w-full bg-foreground text-background hover:bg-foreground/95 px-6 h-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-none flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Initiate Trade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Supplier</DialogTitle>
            <DialogDescription>
              Get in touch with {selectedItem?.farmName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {selectedItem && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedItem.farmName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.location}, {selectedItem.country}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <span className="ml-2 font-semibold">${selectedItem.pricePerKg.toFixed(2)}/kg</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Available:</span>
                    <span className="ml-2 font-semibold">{selectedItem.quantity.toLocaleString()} kg</span>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Input placeholder="Your Company" />
              <textarea
                placeholder="Message to supplier..."
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Send Inquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
