import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Artificial delay to show the "Premium" loader
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Pulsing Avocado Container */}
        <div className="relative w-32 h-32 animate-pulse">
          {/* We'll use a placeholder for now, user can swap with their PNG */}
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-50" />
          <img 
            src="/avo-loader.png" 
            alt="Avocado Loader" 
            className="relative z-10 w-full h-full object-contain"
            onError={(e) => {
              // Fallback to a nice div if image isn't found yet
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.insertAdjacentHTML('beforeend', '<div class="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-lg border-4 border-white">🥑</div>');
            }}
          />
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]" />
        </div>
        
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/60 animate-pulse">
          Synchronizing Market Data
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Loader;
