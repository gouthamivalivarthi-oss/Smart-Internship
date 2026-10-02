import React from 'react';

/**
 * ThreeButton - ThreeUI Tactile 3D Button Component
 * Supports copper/terracotta gradient, ivory glass, tactile 3D press states, and keyboard focus.
 */
const ThreeButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl font-medium gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl font-bold gap-2',
    lg: 'px-6 py-3.5 text-base rounded-2xl font-black gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#C96B4B] via-[#E28A45] to-[#D6A85F] text-white shadow-[0_6px_20px_-3px_rgba(201,107,75,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_10px_26px_-4px_rgba(201,107,75,0.55),inset_0_1px_0_rgba(255,255,255,0.55)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(201,107,75,0.4)] border border-transparent',
    secondary:
      'bg-[#FFFDF7] dark:bg-[#292722] text-[#292722] dark:text-[#FFFDF7] border border-[#B8B0A3]/60 hover:border-[#B87333] shadow-[0_4px_14px_-3px_rgba(41,39,34,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-0.5 hover:bg-[#F7F3EA] dark:hover:bg-[#35312B] hover:shadow-[0_8px_20px_-4px_rgba(184,115,51,0.2)] active:translate-y-0.5',
    copper:
      'bg-gradient-to-r from-[#B87333] to-[#E28A45] text-white shadow-[0_6px_18px_-3px_rgba(184,115,51,0.45)] hover:-translate-y-0.5 active:translate-y-0.5',
    terracotta:
      'bg-[#C96B4B] text-white shadow-[0_6px_18px_-3px_rgba(201,107,75,0.45)] hover:bg-[#A85133] hover:-translate-y-0.5 active:translate-y-0.5',
    gold:
      'bg-gradient-to-r from-[#D6A85F] to-[#E5C07F] text-[#292722] font-bold shadow-[0_6px_20px_-3px_rgba(214,168,95,0.35)] hover:-translate-y-0.5 active:translate-y-0.5',
    sage:
      'bg-gradient-to-r from-[#7E9278] to-[#5F725A] text-white shadow-[0_6px_18px_-3px_rgba(126,146,120,0.35)] hover:-translate-y-0.5 active:translate-y-0.5',
    outline:
      'bg-transparent border-2 border-[#B87333] text-[#B87333] dark:text-[#D6A85F] hover:bg-[#B87333]/10 hover:-translate-y-0.5 active:translate-y-0.5',
    ghost:
      'bg-transparent text-[#292722] dark:text-[#FFFDF7] hover:bg-[#E9E0D2]/50 dark:hover:bg-[#35312B] hover:-translate-y-0.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-[#B87333]/40 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      ) : (
        Icon && <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
      )}
      {children}
    </button>
  );
};

export default ThreeButton;
