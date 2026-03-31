import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShoppingCart, BarChart3, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-background border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 text-xs font-semibold mb-6 border border-emerald-500/20 uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Institutional Grade Market Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
              Avocado Market Data <br />
              <span className="text-muted-foreground font-medium">Reimagined for Professionals.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Real-time pricing, historical analytics, and a verified global supplier network. 
              Built for commercial buyers and analysts who demand precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/prices">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-sm px-6 h-12 text-sm font-semibold group"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Terminal Access
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-secondary/50 text-foreground px-6 h-12 text-sm font-semibold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Marketplace
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid - Part of the Bento feel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Globe, value: '50+', label: 'Global Regions', color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: Zap, value: 'real-time', label: 'Price Updates', color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: ShieldCheck, value: '500+', label: 'Verified Sources', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { icon: BarChart3, value: '$2.4B', label: 'Analyzed Volume', color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border/60 bg-card shadow-soft hover:border-border transition-colors">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-xl font-bold text-foreground mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-none">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
