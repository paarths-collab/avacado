import { MapPin, Package, Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { MarketplaceItem } from '@/data/mockData';

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onBuy?: (item: MarketplaceItem) => void;
}

export default function MarketplaceCard({ item, onBuy }: MarketplaceCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card">
      <CardContent className="p-0">
        {/* Image Placeholder */}
        <div className="relative h-40 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a2e1c] dark:to-[#0f1d10] flex items-center justify-center overflow-hidden">
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

          {/* Buy Button */}
          <Button
            onClick={() => onBuy?.(item)}
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
