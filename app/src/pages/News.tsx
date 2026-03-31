import { useState, useEffect } from 'react';
import { Search, Calendar, ExternalLink, Newspaper, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import NewsCard from '@/components/NewsCard';
import TerminalLoader from '@/components/TerminalLoader';
import { fetchAvocadoNews } from '@/lib/api';
import type { NewsArticle } from '@/data/mockData';

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAvocadoNews(12);
      setArticles(data);
    } catch (err) {
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8F5E9]/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Hero Header - Deep Forest Ambient Style */}
      <section className="relative pt-16 pb-14 bg-gradient-to-b from-primary/10 via-background/50 to-transparent border-b border-foreground/[0.03]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] bg-primary/10 text-primary mb-8 border border-primary/20 backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3" />
                <span>Market Intelligence Stream</span>
              </motion.div>
              <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground tracking-tight leading-[0.9] mb-8">
                Avocado News <br /> & Insights
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-xl">
                Global supply-chain forensics and high-frequency trading narratives 
                delivered through our bespoke intelligence terminal.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button
                variant="outline"
                size="sm"
                onClick={loadNews}
                disabled={loading}
                className="bg-card/50 backdrop-blur-md border-foreground/10 text-[10px] font-extrabold uppercase tracking-[0.2em] px-8 h-12 rounded-leaf shadow-premium hover:bg-card hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-2.5 ${loading ? 'animate-spin' : ''}`} />
                Sync Intelligence
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        {/* Search Bar - High Contrast Terminal Style */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-leaf blur-xl group-focus-within:bg-primary/10 transition-all opacity-0 group-focus-within:opacity-100" />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors z-20" />
            <Input
              placeholder="QUERY GLOBAL DATASETS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 h-20 text-sm font-mono font-bold bg-card/80 backdrop-blur-xl border-foreground/10 rounded-leaf shadow-xl group-focus-within:border-primary/40 transition-all uppercase tracking-widest relative z-10"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 z-20 pointer-events-none opacity-50">
               <span className="text-[10px] font-mono border border-foreground/20 rounded px-2 py-1">CMD</span>
               <span className="text-[10px] font-mono border border-foreground/20 rounded px-2 py-1">K</span>
            </div>
          </motion.div>
        </div>

        {/* Featured Article - Institutional Focal Point */}
        {!loading && !error && filteredArticles.length > 0 && searchQuery === '' && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <Card className="border-foreground/10 shadow-2xl bg-card rounded-leaf overflow-hidden group">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5 min-h-[480px]">
                  <div className="lg:col-span-3 relative bg-muted/40 overflow-hidden">
                    {filteredArticles[0].imageUrl ? (
                      <img
                        src={filteredArticles[0].imageUrl}
                        alt={filteredArticles[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <Newspaper className="w-32 h-32 text-primary opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-40" />
                  </div>
                  <div className="lg:col-span-2 p-10 sm:p-14 flex flex-col justify-center relative">
                    <div className="flex items-center gap-4 mb-10">
                      <Badge className="bg-primary hover:bg-primary text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg pointer-events-none">
                        {filteredArticles[0].source}
                      </Badge>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(filteredArticles[0].publishedAt)}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8 leading-[1.1] group-hover:text-primary transition-colors tracking-tight">
                      <a
                        href={filteredArticles[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {filteredArticles[0].title}
                      </a>
                    </h2>
                    <p className="text-lg text-muted-foreground/90 dark:text-muted-foreground/80 mb-10 leading-relaxed font-medium">
                      {filteredArticles[0].description}
                    </p>
                    <div className="flex items-center gap-8 mt-auto">
                      <a
                        href={filteredArticles[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 text-[11px] font-black text-primary uppercase tracking-[0.3em] group/link"
                      >
                        Source Intelligence Data
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
             <TerminalLoader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-24 bg-card/50 backdrop-blur rounded-leaf border border-foreground/5 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <RefreshCw className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">{error}</h3>
            <Button onClick={loadNews} variant="outline" className="rounded-xl border-foreground/10">
              Force Sync
            </Button>
          </div>
        )}

        {/* Articles Grid - Unified Component */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(searchQuery === '' ? 1 : 0).map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NewsCard article={article} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center py-32 bg-white/20 backdrop-blur rounded-leaf border border-foreground/5 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              No matching intelligence
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Review your search parameters
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
