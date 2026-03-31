import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import RouteLoader from '@/components/RouteLoader';
import GuacamoleBackground from '@/components/GuacamoleBackground';
import PageTransition from '@/components/PageTransition';
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

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative">
      <GuacamoleBackground />
      <Navbar />
      <RouteLoader />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/prices" element={<PageTransition><Prices /></PageTransition>} />
            <Route path="/marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
            <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="avoprice-theme">
      <Router>
        <ScrollToTop />
        <Loader />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
