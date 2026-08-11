import React from 'react';

export const BoxSvg = ({ className, open = false, dark = false }) => {
  const topColor = dark ? "#4A4A4A" : "#D2946A";
  const insideColor = "#C27A50";
  const leftColor = dark ? "#333333" : "#C27A50";
  const rightColor = dark ? "#222222" : "#A85B35";
  const flapColor1 = "#E6A77D";
  const flapColor2 = "#D2946A";

  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#000000" floodOpacity="0.4"/>
        </filter>
        <pattern id="corrugated" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        </pattern>
      </defs>

      <g filter="url(#shadow)">
        {/* Inside / Top */}
        <path d="M100 70 L170 105 L100 140 L30 105 Z" fill={open ? insideColor : topColor} />
        
        {/* Left Side */}
        <path d="M30 105 L100 140 L100 185 L30 150 Z" fill={leftColor} />
        <path d="M30 105 L100 140 L100 185 L30 150 Z" fill="url(#corrugated)" />
        
        {/* Right Side */}
        <path d="M100 140 L170 105 L170 150 L100 185 Z" fill={rightColor} />
        <path d="M100 140 L170 105 L170 150 L100 185 Z" fill="url(#corrugated)" />
        
        {/* Flaps (if open) */}
        {open && (
          <>
            {/* Front Left Flap */}
            <path d="M30 105 L100 140 L70 165 L0 130 Z" fill={flapColor1} />
            {/* Front Right Flap */}
            <path d="M100 140 L170 105 L200 130 L130 165 Z" fill={flapColor2} />
            
            {/* Back Flaps pointing up/out */}
            <path d="M30 105 L100 70 L70 30 L0 65 Z" fill={flapColor1} />
            <path d="M100 70 L170 105 L200 65 L130 30 Z" fill={flapColor2} />
          </>
        )}
      </g>
    </svg>
  );
};
