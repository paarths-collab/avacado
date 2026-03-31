import type { NewsArticle } from '@/data/mockData';

// News API configuration
// const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo';
// const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Fetch avocado-related news
export const fetchAvocadoNews = async (pageSize: number = 10): Promise<NewsArticle[]> => {
  try {
    // Since we don't have a real API key, we'll return mock data
    // In production, uncomment the API call below
    
    // const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
    //   params: {
    //     q: 'avocado',
    //     language: 'en',
    //     sortBy: 'publishedAt',
    //     pageSize,
    //     apiKey: NEWS_API_KEY,
    //   },
    // });
    
    // const articles = response.data.articles.map((article: unknown, index: number) => ({
    //   id: String(index + 1),
    //   title: article.title,
    //   source: article.source.name,
    //   publishedAt: article.publishedAt,
    //   description: article.description,
    //   url: article.url,
    //   imageUrl: article.urlToImage,
    // }));
    
    // return articles;
    
    // For demo purposes, import mock data
    const { mockNewsArticles } = await import('@/data/mockData');
    return mockNewsArticles.slice(0, pageSize);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data on error
    const { mockNewsArticles } = await import('@/data/mockData');
    return mockNewsArticles.slice(0, pageSize);
  }
};

// Price API (mock for now)
export const fetchPriceData = async (_country?: string, timeframe: string = '30d') => {
  try {
    // In production, this would call a real price API
    const { generateChartData } = await import('@/data/mockData');
    const days = timeframe === '7d' ? 7 : timeframe === '1y' ? 365 : 30;
    return generateChartData(days);
  } catch (error) {
    console.error('Error fetching price data:', error);
    return [];
  }
};

// Marketplace API (mock for now)
export const fetchMarketplaceItems = async (filters?: {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  try {
    const { marketplaceItems } = await import('@/data/mockData');
    let items = [...marketplaceItems];
    
    if (filters?.location) {
      items = items.filter(item => 
        item.country.toLowerCase().includes(filters.location!.toLowerCase()) ||
        item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters?.minPrice !== undefined) {
      items = items.filter(item => item.pricePerKg >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      items = items.filter(item => item.pricePerKg <= filters.maxPrice!);
    }
    
    return items;
  } catch (error) {
    console.error('Error fetching marketplace items:', error);
    return [];
  }
};
