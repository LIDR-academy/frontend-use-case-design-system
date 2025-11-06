import React from 'react';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Whether the switch is checked (on) or unchecked (off)
   */
  checked?: boolean;
  /**
   * Callback fired when the switch is toggled
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Size variant of the switch
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label text for the switch (optional)
   */
  label?: string;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onCheckedChange,
  size = 'md',
  label,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onCheckedChange?.(event.target.checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Handle Space and Enter keys for keyboard accessibility
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    }
  };

  // Size variants for the switch track
  const sizeStyles = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  };

  // Size variants for the switch thumb (circular knob)
  const thumbSizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Translate positions when checked
  const thumbTranslateStyles = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-7',
  };

  const baseTrackStyles =
    'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  const trackStateStyles = checked
    ? 'bg-primary'
    : 'bg-input hover:bg-input/80';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const thumbBaseStyles =
    'pointer-events-none inline-block rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out';

  const thumbPositionStyles = checked
    ? thumbTranslateStyles[size]
    : 'translate-x-0';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Hidden input for form integration and accessibility */}
      <input
        type="checkbox"
        id={switchId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledBy}
        {...props}
      />

      {/* Visual switch button */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={`${baseTrackStyles} ${sizeStyles[size]} ${trackStateStyles} ${disabledStyles}`}
      >
        {/* Thumb (circular knob) */}
        <span
          className={`${thumbBaseStyles} ${thumbSizeStyles[size]} ${thumbPositionStyles}`}
          aria-hidden="true"
        />
      </button>

      {/* Optional label */}
      {label && (
        <label
          htmlFor={switchId}
          className={`text-sm font-medium text-foreground select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Switch.displayName = 'Switch';
