'use client';

import { useState } from 'react';
import { ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function InteractiveCard({ children, className = '', onClick, style }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick?.();
  };

  return (
    <div
      className={`
        interactive-card 
        relative overflow-hidden cursor-pointer
        ${isHovered ? 'hover-lift' : ''}
        ${isClicked ? 'scale-95' : ''}
        ${className}
      `}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ${isClicked ? 'opacity-20' : ''}`}></div>
      </div>
      
      {children}
      
      {/* Hover glow effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>
        </div>
      )}
    </div>
  );
}
