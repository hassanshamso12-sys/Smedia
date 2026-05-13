import React from 'react';

const ChartPlaceholder = ({ height = 200 }: { height?: number }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: height, 
      display: 'flex', 
      alignItems: 'flex-end', 
      gap: '8px',
      padding: '20px 10px 10px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Simulate a wave/line chart with an SVG */}
      <svg 
        viewBox="0 0 400 100" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.4))'
        }}
        preserveAspectRatio="none"
      >
        <path 
          d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10" 
          fill="none" 
          stroke="var(--accent-primary)" 
          strokeWidth="3"
        />
        <path 
          d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10 L400,100 L0,100 Z" 
          fill="url(#gradient)" 
          opacity="0.2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Bars for extra visual flair */}
      {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75].map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${h}%`,
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '4px 4px 0 0',
          zIndex: 1
        }} />
      ))}
    </div>
  );
};

export default ChartPlaceholder;
