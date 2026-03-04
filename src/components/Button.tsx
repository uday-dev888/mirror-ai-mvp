import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-200 inline-flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-[#4E342E] text-white hover:bg-[#5D4037] active:bg-[#3E2723] shadow-sm',
    secondary: 'bg-transparent border-2 border-[#4E342E] text-[#4E342E] hover:bg-[#4E342E] hover:text-white',
    ghost: 'bg-transparent text-[#4E342E] hover:bg-[#FAF8F3]'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
