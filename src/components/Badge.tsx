import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'new' | 'live' | 'completed' | 'active';
  className?: string;
}

export function Badge({ children, variant = 'new', className = '' }: BadgeProps) {
  const variantClasses = {
    new: 'bg-[#FFD54F] text-[#3E2723]',
    live: 'bg-green-500 text-white',
    completed: 'bg-gray-400 text-white',
    active: 'bg-green-100 text-green-800 border border-green-200'
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
