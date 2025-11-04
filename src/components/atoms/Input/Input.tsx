import React, { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      variant = 'outlined',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      'flex items-center gap-2 px-3 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = {
      outlined: `border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring rounded-md ${
        error ? 'border-destructive focus-visible:ring-destructive' : ''
      }`,
      filled: `border-0 bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-ring rounded-md ${
        error ? 'bg-destructive/10 focus-visible:ring-destructive' : ''
      }`,
      standard: `border-0 border-b-2 border-input bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-0 rounded-none px-0 pb-1 ${
        error ? 'border-destructive focus-visible:border-destructive' : ''
      }`,
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${variantStyles[variant]} ${
              startIcon ? 'pl-10' : ''
            } ${endIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-destructive" role="alert">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-muted-foreground">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
