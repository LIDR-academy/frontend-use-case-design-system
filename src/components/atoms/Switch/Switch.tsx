import React, { forwardRef } from 'react';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      size = 'md',
      label,
      disabled = false,
      className = '',
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = event.target.checked;
      onCheckedChange?.(newChecked);
      onChange?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const newChecked = !checked;
        onCheckedChange?.(newChecked);
      }
    };

    // Size variants for the switch container and thumb
    const sizeStyles = {
      sm: {
        container: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      md: {
        container: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
      lg: {
        container: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
      },
    };

    const currentSize = sizeStyles[size];

    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              onCheckedChange?.(!checked);
            }
          }}
          onKeyDown={handleKeyDown}
          className={`
            ${currentSize.container}
            relative inline-flex items-center rounded-full
            border-2 transition-colors duration-200 ease-in-out
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ${
              checked
                ? 'bg-primary border-primary'
                : 'bg-background border-border'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${
              !disabled &&
              (checked
                ? 'hover:bg-primary/90 hover:border-primary/90'
                : 'hover:bg-muted hover:border-muted-foreground')
            }
          `}
        >
          <span className="sr-only">{label || 'Toggle switch'}</span>
          <span
            className={`
              ${currentSize.thumb}
              inline-block rounded-full bg-background shadow-lg
              transform transition-transform duration-200 ease-in-out
              ${checked ? currentSize.translate : 'translate-x-0'}
            `}
          />
        </button>

        {/* Hidden native input for form integration and accessibility */}
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-hidden="true"
          {...props}
        />

        {label && (
          <label
            id={`${switchId}-label`}
            htmlFor={switchId}
            className={`text-sm font-medium select-none ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
