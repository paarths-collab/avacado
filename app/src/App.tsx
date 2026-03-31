import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import Home from '@/pages/Home';
import Prices from '@/pages/Prices';
import Marketplace from '@/pages/Marketplace';
import News from '@/pages/News';
import { ThemeProvider } from '@/components/theme-provider';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="avoprice-theme">
      <Router>
        <ScrollToTop />
        <Loader />
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
