import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variantStyles = {
    default: 'bg-[#F6EBDD] text-[#3D2B24] dark:bg-[#3D2B24] dark:text-[#FFF8ED] border border-[#F5B895]/30',
    primary: 'bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/30',
    coral: 'bg-[#E9785B]/15 text-[#C85C45] dark:text-[#F5B895] border border-[#E9785B]/35 font-bold',
    peach: 'bg-[#F5B895]/20 text-[#C85C45] dark:text-[#F5B895] border border-[#F5B895]/40 font-bold',
    success: 'bg-[#9DB79B]/20 text-[#5C7D5A] dark:text-[#9DB79B] border border-[#9DB79B]/40 font-semibold',
    sage: 'bg-[#9DB79B]/20 text-[#5C7D5A] dark:text-[#9DB79B] border border-[#9DB79B]/40 font-semibold',
    warning: 'bg-[#F5B895]/25 text-[#A84532] dark:text-[#F5B895] border border-[#F5B895]/50 font-semibold',
    danger: 'bg-[#C85C45]/15 text-[#A84532] dark:text-[#E9785B] border border-[#C85C45]/30 font-semibold',
    lavender: 'bg-[#B9A7E8]/25 text-[#6C54A7] dark:text-[#B9A7E8] border border-[#B9A7E8]/40 font-semibold',
    purple: 'bg-[#8F78C8]/20 text-[#6C54A7] dark:text-[#B9A7E8] border border-[#8F78C8]/35 font-semibold',
    terracotta: 'bg-[#C85C45]/20 text-[#A84532] dark:text-[#F5B895] border border-[#C85C45]/40 font-bold',
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[11px]',
    sm: 'px-2.5 py-1 text-xs font-semibold',
    md: 'px-3.5 py-1.5 text-sm font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full transition-colors ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
