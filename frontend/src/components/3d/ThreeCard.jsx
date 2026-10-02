import React, { useRef, useState } from 'react';

/**
 * ThreeCard - 3D Interactive Tilt Card Component
 * Provides subtle perspective tilt, elevation, and specular glare on mouse hover
 */
const ThreeCard = ({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`
    );

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 0.35,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.7) 0%, rgba(245, 184, 149, 0.15) 50%, transparent 80%)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#30211B]/95 border border-[#F6EBDD] dark:border-[#553B30] shadow-[0_10px_30px_-10px_rgba(61,43,36,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(200,92,69,0.22)] ${className}`}
      {...props}
    >
      {/* Specular Glare Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={glareStyle}
        />
      )}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};

export default ThreeCard;
