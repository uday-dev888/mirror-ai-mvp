import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ showTagline = false, size = 'md' }: LogoProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const sizes = {
    sm: {
      icon: 20,
      text: 'text-lg',
      tagline: 'text-[10px]'
    },
    md: {
      icon: 28,
      text: 'text-2xl',
      tagline: 'text-xs'
    },
    lg: {
      icon: 36,
      text: 'text-4xl',
      tagline: 'text-sm'
    }
  };

  const content = (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3">
        <svg
          width={sizes[size].icon}
          height={sizes[size].icon}
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#4E342E]"
        >
          <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span
          className={`${sizes[size].text} font-bold tracking-wider text-[#3E2723]`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          MIRROR AI
        </span>
      </div>
      {showTagline && (
        <p
          className={`${sizes[size].tagline} text-[#6B4423] tracking-widest uppercase mt-1`}
        >
          The Reflection of Now
        </p>
      )}
    </div>
  );

  if (isLoginPage) {
    return content;
  }

  return (
    <Link to="/dashboard" className="transition-opacity duration-200 hover:opacity-80">
      {content}
    </Link>
  );
}
