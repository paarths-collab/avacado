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
    <main className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Avocado Marketplace
              </h1>
              <p className="text-muted-foreground mt-1">
                Connect directly with verified suppliers worldwide
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
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
            <Card className="border-0 shadow-card bg-card sticky top-24">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Filter className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Farm, location, variety..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
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
                <div className="pt-5 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Market Overview
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lowest Price</span>
                      <span className="font-semibold text-emerald-600">
                        ${Math.min(...marketplaceItems.map((i) => i.pricePerKg)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Highest Price</span>
                      <span className="font-semibold text-foreground">
                        ${Math.max(...marketplaceItems.map((i) => i.pricePerKg)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Average Rating</span>
                      <span className="font-semibold text-amber-500">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded-lg px-3 py-1.5 bg-card text-foreground border-border">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Quantity</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card"
                >
                  <CardContent className="p-0">
                    {/* Image Placeholder */}
                    <div className="relative h-44 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-[#4CAF50]" />
                        <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-[#81C784]" />
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-background/90 flex items-center justify-center shadow-md">
                          <Package className="w-8 h-8 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-background/90 text-primary font-medium border-primary/20">
                          {item.variety}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-border/50">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold">{item.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Farm Name */}
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.farmName}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                          {item.location}, {item.country}
                        </span>
                      </div>

                      {/* Price & Quantity Row */}
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Price per kg</p>
                          <p className="text-2xl font-bold text-primary">
                            ${item.pricePerKg.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-0.5">Available</p>
                          <p className="text-sm font-medium text-foreground">
                            {item.quantity.toLocaleString()} kg
                          </p>
                        </div>
                      </div>

                      {/* Contact Button */}
                      <Button
                        onClick={() => handleContact(item)}
                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Contact Seller
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
