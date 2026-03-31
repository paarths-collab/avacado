import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

const Logo: React.FC<LogoProps> = ({ className, size = 40 }) => {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-sm flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/logo.png" 
        alt="AvoPrice Logo" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Logo;
