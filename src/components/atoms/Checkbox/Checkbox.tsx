import React, { useRef, useEffect } from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Indeterminate state (partially checked)
   */
  indeterminate?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  indeterminate = false,
  error,
  helperText,
  disabled = false,
  className,
  id,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // Handle indeterminate state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const checkboxClasses = [
    // Base styles
    'size-4 rounded border border-gray-300 bg-white',
    'transition-colors duration-200',
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    // Checked state
    'checked:bg-blue-500 checked:border-blue-500',
    // Hover state
    'hover:border-gray-400',
    // Disabled state
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100',
    // Custom classes
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <input
          ref={inputRef}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={checkboxClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${checkboxId}-error`
              : helperText
                ? `${checkboxId}-helper`
                : undefined
          }
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={`text-sm font-medium text-gray-700 select-none cursor-pointer ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p
          id={`${checkboxId}-error`}
          className="text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${checkboxId}-helper`} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
