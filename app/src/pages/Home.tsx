import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShoppingCart, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import PriceCard from '@/components/PriceCard';
import PriceChart from '@/components/PriceChart';
import MarketComposition from '@/components/MarketComposition';
import MarketplaceCard from '@/components/MarketplaceCard';
import NewsCard from '@/components/NewsCard';
import Footer from '@/components/Footer';
import { globalPrices, marketplaceItems, mockNewsArticles } from '@/data/mockData';

export default function Home() {
  const topPrices = globalPrices.slice(0, 4);
  const featuredListings = marketplaceItems.slice(0, 3);
  const latestNews = mockNewsArticles.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Bento Box Dashboard Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground tabular-nums flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Market Overview
              </h2>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                Aggregated pricing data from global hubs
              </p>
            </div>
            <Link to="/prices" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-[0.2em] bg-white px-3 py-1.5 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-all">
              Full Terminal
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topPrices.map((price) => (
              <PriceCard key={price.code} data={price} />
            ))}
          </div>
        </div>
      </section>

      {/* Chart Preview Section */}
      <section className="py-20 bg-background border-y border-foreground/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0)', backgroundSize: '16px 16px' }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.25em] bg-primary/10 text-primary mb-6 border border-primary/20">
                <TrendingUp className="w-3 h-3" />
                <span>Advanced Analytics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4 tracking-tight leading-tight">
                Avocado Market Intelligence Terminal
              </h2>
              <p className="text-md text-muted-foreground mb-8 leading-relaxed max-w-lg font-medium">
                Access deep-tier historical avocado pricing data and seasonality index tracking. 
                Our platform provides the precision required for high-volume 
                commercial sourcing and distribution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12 bg-card p-8 rounded-leaf border border-foreground/10 shadow-sm relative overflow-hidden">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-display font-bold text-foreground mb-4 tracking-tight"> Market Composition </h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-sm font-medium">
                    Our 'Cross-Section' algorithm tracks the three tiers of global avocado trade: 
                    Premium Organic (Skin), Standard Commercial (Flesh), and Core Wholesale (Pit).
                  </p>
                  <MarketComposition />
                </div>
                <div className="order-1 md:order-2">
                  <PriceChart title="Global Hass Benchmark (30D)" height={400} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview Section */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.25em] bg-emerald-500/10 text-emerald-800 dark:text-emerald-500 mb-4 border border-emerald-500/20">
                <ShoppingCart className="w-3 h-3" />
                <span>Spot Market</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Verified Global Suppliers
              </h2>
            </div>
            <Link to="/marketplace" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-[0.2em] bg-white px-4 py-2.5 rounded-xl border border-foreground/10 transition-all hover:border-foreground/20">
              Source Inventory
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>



      {/* News Preview Section */}
      <section className="py-24 bg-background border-t border-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.25em] bg-blue-500/10 text-blue-600 mb-4 border border-blue-500/20">
                <Newspaper className="w-3 h-3" />
                <span>Briefing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Global Industry Intelligence
              </h2>
            </div>
            <Link to="/news" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-[0.2em] bg-white px-4 py-2.5 rounded-xl border border-foreground/10 transition-all hover:border-foreground/20">
              All News
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] p-8 sm:p-12 lg:p-16 text-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Optimize Your Avocado Business?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Join thousands of buyers and sellers using AvoPrice to make smarter decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg"
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
