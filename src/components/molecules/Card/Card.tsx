import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'elevated' | 'outlined' | 'filled';
  className?: string;
  headerActions?: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'elevated',
  className = '',
  headerActions,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-all duration-200';

  const variantStyles = {
    elevated: 'bg-card text-card-foreground shadow-md hover:shadow-lg',
    outlined: 'bg-card text-card-foreground border border-border',
    filled: 'bg-muted text-muted-foreground',
  };

  const clickableStyles = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...props}
    >
      {(title || headerActions) && (
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {headerActions && <div className="ml-4">{headerActions}</div>}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};
