import React from 'react';

/**
 * ThreeButton - Dimensional 3D Tactile Button Component
 * Supports coral/terracotta gradient, cream glass, and tactile press states
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
    md: 'px-5 py-2.5 text-sm rounded-xl font-semibold gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl font-bold gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#E9785B] to-[#C85C45] text-white shadow-[0_6px_20px_-3px_rgba(200,92,69,0.4),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_10px_26px_-4px_rgba(200,92,69,0.52),inset_0_1px_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(200,92,69,0.4)] border border-transparent',
    secondary:
      'bg-white/95 dark:bg-[#38261F] text-[#3D2B24] dark:text-[#FFF8ED] border border-[#F5B895]/60 hover:border-[#E9785B] shadow-[0_4px_14px_-3px_rgba(61,43,36,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-0.5 hover:bg-[#FFF8ED] dark:hover:bg-[#452E25] hover:shadow-[0_8px_20px_-4px_rgba(233,120,91,0.2)] active:translate-y-0.5',
    terracotta:
      'bg-[#C85C45] text-white shadow-[0_6px_18px_-3px_rgba(200,92,69,0.45)] hover:bg-[#A84532] hover:-translate-y-0.5 active:translate-y-0.5',
    lavender:
      'bg-gradient-to-r from-[#B9A7E8] to-[#8F78C8] text-white shadow-[0_6px_20px_-3px_rgba(143,120,200,0.35)] hover:-translate-y-0.5 active:translate-y-0.5',
    sage:
      'bg-gradient-to-r from-[#9DB79B] to-[#7D9A7B] text-white shadow-[0_6px_18px_-3px_rgba(125,154,123,0.35)] hover:-translate-y-0.5 active:translate-y-0.5',
    outline:
      'bg-transparent border-2 border-[#E9785B] text-[#E9785B] hover:bg-[#E9785B]/10 hover:-translate-y-0.5 active:translate-y-0.5',
    ghost:
      'bg-transparent text-[#3D2B24] dark:text-[#FFF8ED] hover:bg-[#F6EBDD]/60 dark:hover:bg-[#452E25] hover:-translate-y-0.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-[#E9785B]/50 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
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
