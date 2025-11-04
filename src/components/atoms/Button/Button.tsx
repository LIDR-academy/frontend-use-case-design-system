import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-md';

  const variantStyles = {
    primary: `bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring`,
    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring`,
    outline: `border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring`,
    destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-ring`,
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm gap-2',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
