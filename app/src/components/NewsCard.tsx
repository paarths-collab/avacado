import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { NewsArticle } from '@/data/mockData';

interface NewsCardProps {
  article: NewsArticle;
  compact?: boolean;
}

const springProps = {
  whileHover: { scale: 1.02, y: -5 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring" as const, stiffness: 300, damping: 15, mass: 1.2 }
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NewsCard({ article, compact = false }: NewsCardProps) {
  if (compact) {
    return (
      <motion.div {...springProps} className="h-full">
        <div className="group flex gap-4 p-4 rounded-leaf border border-foreground/10 bg-card hover:border-foreground/20 transition-all duration-300 h-full">
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a2e1c] dark:to-[#0f1d10] flex-shrink-0 flex items-center justify-center overflow-hidden">
            {article.imageUrl ? (
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <Newspaper className="w-8 h-8 text-primary/40" />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant="secondary" className="text-[10px] font-bold bg-primary/10 text-primary border-primary/20 shrink-0">
                {article.source}
              </Badge>
              <span className="text-[10px] text-muted-foreground dark:text-muted-foreground/80 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...springProps} className="h-full">
      <div className="group flex flex-col rounded-leaf border border-foreground/10 bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden h-full">
        {/* Image area */}
        <div className="relative h-44 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a2e1c] dark:to-[#0f1d10]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-14 h-14 text-primary/20" />
            </div>
          )}
          {/* Source badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <Badge className="bg-background/90 text-primary text-[10px] font-bold backdrop-blur-sm border border-primary/20 shadow-sm">
              {article.source}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-3">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground dark:text-muted-foreground/80" />
            <span className="text-[11px] font-bold text-muted-foreground dark:text-muted-foreground/80 uppercase tracking-widest">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h3 className="font-bold text-base text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70 line-clamp-2 mb-4 leading-relaxed flex-1">
            {article.description}
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
          >
            Read More
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
