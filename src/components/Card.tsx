import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className = '', ...props }: CardProps) {
  const hoverClasses = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`bg-[#FAF8F3] rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
