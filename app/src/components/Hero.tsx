import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShoppingCart, BarChart3, Globe, ShieldCheck, Zap } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const spring = useSpring(0, { mass: 1, stiffness: 45, damping: 15 });
  const display = useTransform(spring, (current) => {
    if (value.includes('$')) return `$${current.toFixed(1)}${value.includes('B') ? 'B' : ''}`;
    return Math.floor(current).toLocaleString() + suffix;
  });

  useEffect(() => {
    spring.set(numericValue);
  }, [numericValue, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-background border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20 uppercase tracking-widest"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Institutional Grade Market Intelligence</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-[1.05] mb-6 tracking-tight">
              Avocado Market Data <br />
              <span className="text-muted-foreground font-medium">Reimagined for Professionals.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed font-medium">
              Real-time pricing, historical analytics, and a verified global supplier network. 
              Built for commercial buyers and analysts who demand precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/prices">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm px-8 h-12 text-sm font-bold group rounded-lg"
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
                  className="border-border hover:bg-secondary/50 text-foreground px-8 h-12 text-sm font-bold rounded-lg"
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
              { icon: Globe, value: '50', label: 'Global Regions', color: 'text-blue-500', bg: 'bg-blue-500/10', suffix: '+' },
              { icon: Zap, value: 'Live', label: 'Price Updates', color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: ShieldCheck, value: '500', label: 'Verified Sources', color: 'text-emerald-500', bg: 'bg-emerald-500/10', suffix: '+' },
              { icon: BarChart3, value: '$2.4B', label: 'Analyzed Volume', color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm hover:border-border transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-mono font-bold text-foreground mb-1 tabular-nums">
                  {typeof stat.value === 'string' && !stat.value.match(/[0-9]/) ? (
                    stat.value
                  ) : (
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
