import React, { useId } from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Size variant of the checkbox
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  /**
   * Whether the checkbox is checked (controlled)
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      error,
      helperText,
      indeterminate = false,
      disabled = false,
      required = false,
      checked,
      defaultChecked,
      onChange,
      className = '',
      id: providedId,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperTextId = `${id}-helper`;

    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const checkboxRef = React.useRef<HTMLInputElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => checkboxRef.current!);

    // Handle indeterminate state
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const getAriaDescribedBy = () => {
      const ids = [];
      if (error) ids.push(errorId);
      if (helperText) ids.push(helperTextId);
      if (ariaDescribedBy) ids.push(ariaDescribedBy);
      return ids.length > 0 ? ids.join(' ') : undefined;
    };

    return (
      <div className={`inline-flex flex-col gap-1 ${className}`}>
        <label
          htmlFor={id}
          className={`inline-flex items-center gap-2 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            id={id}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            required={required}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={getAriaDescribedBy()}
            className={`
              ${sizeClasses[size]}
              appearance-none
              border
              border-solid
              rounded
              bg-white
              transition-all
              duration-200
              cursor-pointer
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:ring-offset-1
              ${
                error
                  ? 'border-destructive'
                  : 'border-[#cccccc] hover:border-primary'
              }
              ${
                disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:shadow-sm'
              }
              checked:bg-primary
              checked:border-primary
              checked:hover:bg-primary-600
              indeterminate:bg-primary
              indeterminate:border-primary
              relative
              after:content-['']
              after:absolute
              after:hidden
              checked:after:block
              after:left-[0.25rem]
              after:top-[0.05rem]
              after:w-[0.25rem]
              after:h-[0.5rem]
              after:border-white
              after:border-r-2
              after:border-b-2
              after:rotate-45
              ${size === 'sm' ? 'after:left-[0.15rem] after:top-[0.02rem] after:w-[0.2rem] after:h-[0.35rem]' : ''}
              ${size === 'lg' ? 'after:left-[0.35rem] after:top-[0.1rem] after:w-[0.3rem] after:h-[0.6rem]' : ''}
            `}
            {...props}
          />
          {label && (
            <span
              className={`${labelSizeClasses[size]} ${
                disabled ? 'text-gray-400' : 'text-foreground'
              }`}
            >
              {label}
              {required && (
                <span className="text-destructive ml-1" aria-label="required">
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {error && (
          <span
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </span>
        )}

        {helperText && !error && (
          <span
            id={helperTextId}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
