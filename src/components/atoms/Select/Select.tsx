import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      fullWidth = false,
      placeholder,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      'appearance-none px-3 py-2 text-base bg-background border border-input rounded-md text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

    const errorStyles = error
      ? 'border-destructive focus-visible:ring-destructive'
      : '';

    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    // Chevron down icon
    const ChevronDownIcon = (
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );

    return (
      <div className={`flex flex-col gap-1 ${widthStyles}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-light text-foreground"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseStyles} ${errorStyles} ${widthStyles} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {ChevronDownIcon}
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

Select.displayName = 'Select';
