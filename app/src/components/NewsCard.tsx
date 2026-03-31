import { ExternalLink, Calendar, Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NewsArticle } from '@/data/mockData';

interface NewsCardProps {
  article: NewsArticle;
  compact?: boolean;
}

export default function NewsCard({ article, compact = false }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (compact) {
    return (
      <Card className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] flex-shrink-0 flex items-center justify-center overflow-hidden">
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Newspaper className="w-8 h-8 text-primary/50" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary">
                  {article.source}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] overflow-hidden">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-primary/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/90 text-primary font-medium backdrop-blur-sm border-primary/20">
              {article.source}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {article.description}
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read More
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
