// Mock data for avocado prices and marketplace

export interface PriceData {
  country: string;
  code: string;
  price: number;
  currency: string;
  change: number;
  coordinates: [number, number];
}

export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface MarketplaceItem {
  id: string;
  farmName: string;
  location: string;
  country: string;
  pricePerKg: number;
  quantity: number;
  variety: string;
  image?: string;
  rating: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  description: string;
  url: string;
  imageUrl?: string;
}

// Global price data
export const globalPrices: PriceData[] = [
  { country: "Mexico", code: "MEX", price: 2.45, currency: "USD", change: 3.2, coordinates: [-102.5528, 23.6345] },
  { country: "USA", code: "USA", price: 3.89, currency: "USD", change: -1.5, coordinates: [-95.7129, 37.0902] },
  { country: "Chile", code: "CHL", price: 2.78, currency: "USD", change: 5.1, coordinates: [-71.543, -35.6751] },
  { country: "Peru", code: "PER", price: 2.34, currency: "USD", change: 2.8, coordinates: [-75.0152, -9.19] },
  { country: "Colombia", code: "COL", price: 2.12, currency: "USD", change: -0.8, coordinates: [-74.2973, 4.5709] },
  { country: "Spain", code: "ESP", price: 4.15, currency: "USD", change: 1.2, coordinates: [-3.7492, 40.4637] },
  { country: "Israel", code: "ISR", price: 3.67, currency: "USD", change: -2.3, coordinates: [34.8516, 31.0461] },
  { country: "South Africa", code: "ZAF", price: 2.89, currency: "USD", change: 4.5, coordinates: [22.9375, -30.5595] },
  { country: "Kenya", code: "KEN", price: 1.95, currency: "USD", change: 6.2, coordinates: [37.9062, -0.0236] },
  { country: "Australia", code: "AUS", price: 4.56, currency: "USD", change: -0.5, coordinates: [133.7751, -25.2744] },
  { country: "New Zealand", code: "NZL", price: 4.78, currency: "USD", change: 1.8, coordinates: [174.8859, -40.9006] },
  { country: "Netherlands", code: "NLD", price: 4.23, currency: "USD", change: 0.9, coordinates: [5.2913, 52.1326] },
];

// Chart data for price trends
export const generateChartData = (days: number = 30, seed: number = 0): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const basePrice = 2.0 + (seed % 10) / 5; // Base price dependent on seed
  const today = new Date();
  
  // Simple pseudo-random generator based on seed
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const r = random(seed + i);
    const randomChange = (r - 0.5) * 0.4;
    const price = basePrice + randomChange + Math.sin((i + seed) / 5) * 0.3;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Number(Math.max(0.5, price).toFixed(2))
    });
  }
  return data;
};

// Marketplace items
export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    farmName: "Verde Valley Farms",
    location: "Michoacán",
    country: "Mexico",
    pricePerKg: 2.15,
    quantity: 5000,
    variety: "Hass",
    rating: 4.8
  },
  {
    id: "2",
    farmName: "Andean Avocados",
    location: "Lima Region",
    country: "Peru",
    pricePerKg: 2.28,
    quantity: 3200,
    variety: "Hass",
    rating: 4.6
  },
  {
    id: "3",
    farmName: "Chilean Green Co.",
    location: "Valparaíso",
    country: "Chile",
    pricePerKg: 2.65,
    quantity: 2800,
    variety: "Fuerte",
    rating: 4.7
  },
  {
    id: "4",
    farmName: "Sunrise Orchards",
    location: "California",
    country: "USA",
    pricePerKg: 3.45,
    quantity: 1500,
    variety: "Hass",
    rating: 4.9
  },
  {
    id: "5",
    farmName: "Mediterranean Greens",
    location: "Málaga",
    country: "Spain",
    pricePerKg: 3.95,
    quantity: 2100,
    variety: "Hass",
    rating: 4.5
  },
  {
    id: "6",
    farmName: "African Avocado Exports",
    location: "Nairobi",
    country: "Kenya",
    pricePerKg: 1.85,
    quantity: 4500,
    variety: "Fuerte",
    rating: 4.3
  },
  {
    id: "7",
    farmName: "Down Under Groves",
    location: "Queensland",
    country: "Australia",
    pricePerKg: 4.25,
    quantity: 1200,
    variety: "Hass",
    rating: 4.7
  },
  {
    id: "8",
    farmName: "Cape Harvest",
    location: "Western Cape",
    country: "South Africa",
    pricePerKg: 2.75,
    quantity: 3800,
    variety: "Pinkerton",
    rating: 4.4
  }
];

// News articles (mock data)
export const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Global Avocado Prices Surge as Demand Outpaces Supply",
    source: "Agriculture Weekly",
    publishedAt: "2024-03-28T10:30:00Z",
    description: "Avocado prices have increased by 15% globally due to weather-related supply constraints in major producing regions.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=250&fit=crop"
  },
  {
    id: "2",
    title: "Sustainable Farming Practices Transform Avocado Industry",
    source: "Green Business Journal",
    publishedAt: "2024-03-27T14:15:00Z",
    description: "New irrigation technologies and organic farming methods are helping avocado farmers reduce water usage by 40%.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&h=250&fit=crop"
  },
  {
    id: "3",
    title: "Mexico Remains Top Avocado Exporter Despite Climate Challenges",
    source: "Trade Insights",
    publishedAt: "2024-03-26T09:00:00Z",
    description: "Mexican avocado exports reached record levels in Q1 2024, solidifying its position as the world's largest supplier.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?w=400&h=250&fit=crop"
  },
  {
    id: "4",
    title: "European Market Shows Strong Appetite for Premium Avocados",
    source: "Fresh Produce Daily",
    publishedAt: "2024-03-25T16:45:00Z",
    description: "European consumers are increasingly willing to pay premium prices for high-quality, sustainably sourced avocados.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?w=400&h=250&fit=crop"
  },
  {
    id: "5",
    title: "New Avocado Variety Shows Promise for Drought Resistance",
    source: "AgriTech News",
    publishedAt: "2024-03-24T11:20:00Z",
    description: "Researchers have developed a new avocado cultivar that requires 30% less water while maintaining quality and yield.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=250&fit=crop"
  },
  {
    id: "6",
    title: "Avocado Oil Market Expands as Health Benefits Gain Recognition",
    source: "Food Industry Report",
    publishedAt: "2024-03-23T13:00:00Z",
    description: "The global avocado oil market is projected to grow 8% annually as consumers recognize its health benefits.",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1543362906-ac1b16c6756c?w=400&h=250&fit=crop"
  }
];
