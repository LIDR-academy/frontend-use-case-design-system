import React, { useReducer, useCallback } from 'react';

// Icon definitions
const icons = {
  leaf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  accessibility: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  ),
  x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  handshake: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  ),
  'arrow-left': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof icons;
export type IconState = 'default' | 'hover' | 'focus' | 'disabled';
export type IconColorVariant = 'primary' | 'secondary' | 'tertiary';

interface IconStateConfig {
  state: IconState;
  colorVariant: IconColorVariant;
}

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, 'color'> {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted' | 'destructive' | 'foreground';
  colorVariant?: IconColorVariant;
  state?: IconState;
  interactive?: boolean;
  disabled?: boolean;
  className?: string;
  onStateChange?: (state: IconState) => void;
}

// State reducer for interactive icons
function iconStateReducer(
  state: IconStateConfig,
  action: string
): IconStateConfig {
  if (state.colorVariant === 'primary' && state.state === 'hover') {
    switch (action) {
      case 'mouse_leave':
        return { colorVariant: 'primary', state: 'default' };
      case 'focus':
        return { ...state, state: 'focus' };
      case 'blur':
        return { ...state, state: 'default' };
    }
  }

  if (state.colorVariant === 'secondary' && state.state === 'hover') {
    switch (action) {
      case 'mouse_leave':
        return { colorVariant: 'secondary', state: 'default' };
      case 'focus':
        return { ...state, state: 'focus' };
      case 'blur':
        return { ...state, state: 'default' };
    }
  }

  if (state.colorVariant === 'tertiary' && state.state === 'hover') {
    switch (action) {
      case 'mouse_leave':
        return { colorVariant: 'tertiary', state: 'default' };
      case 'focus':
        return { ...state, state: 'focus' };
      case 'blur':
        return { ...state, state: 'default' };
    }
  }

  switch (action) {
    case 'mouse_enter':
      return { ...state, state: 'hover' };
    case 'mouse_leave':
      return { ...state, state: 'default' };
    case 'focus':
      return { ...state, state: 'focus' };
    case 'blur':
      return { ...state, state: 'default' };
    case 'disable':
      return { ...state, state: 'disabled' };
    case 'enable':
      return { ...state, state: 'default' };
    default:
      return state;
  }
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'foreground',
  colorVariant = 'primary',
  state: controlledState,
  interactive = false,
  disabled = false,
  className = '',
  onStateChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const [internalState, dispatch] = useReducer(iconStateReducer, {
    colorVariant,
    state: disabled ? 'disabled' : controlledState || 'default',
  });

  const currentState = controlledState || internalState.state;

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  // Backward compatibility: if color prop is used, use semantic colors
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
    destructive: 'text-destructive',
    foreground: 'text-foreground',
  };

  // New interactive color variants with states
  const getInteractiveColor = () => {
    if (!interactive) return colorClasses[color];

    const variant = internalState.colorVariant;
    const state = currentState;

    if (variant === 'primary') {
      switch (state) {
        case 'hover':
        case 'focus':
          return 'text-primary-600 transition-colors duration-200';
        case 'disabled':
          return 'text-gray-400';
        default:
          return 'text-primary transition-colors duration-200';
      }
    }

    if (variant === 'secondary') {
      switch (state) {
        case 'hover':
        case 'focus':
          return 'text-white transition-colors duration-200';
        case 'disabled':
          return 'text-gray-400';
        default:
          return 'text-white transition-colors duration-200';
      }
    }

    if (variant === 'tertiary') {
      switch (state) {
        case 'hover':
        case 'focus':
          return 'text-gray-700 transition-colors duration-200';
        case 'disabled':
          return 'text-gray-400';
        default:
          return 'text-gray-600 transition-colors duration-200';
      }
    }

    return colorClasses[color];
  };

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLSpanElement | SVGElement>) => {
      if (interactive && !disabled) {
        dispatch('mouse_enter');
        onStateChange?.('hover');
      }
      onMouseEnter?.(event as React.MouseEvent<SVGElement>);
    },
    [interactive, disabled, onStateChange, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLSpanElement | SVGElement>) => {
      if (interactive && !disabled) {
        dispatch('mouse_leave');
        onStateChange?.('default');
      }
      onMouseLeave?.(event as React.MouseEvent<SVGElement>);
    },
    [interactive, disabled, onStateChange, onMouseLeave]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLSpanElement | SVGElement>) => {
      if (interactive && !disabled) {
        dispatch('focus');
        onStateChange?.('focus');
      }
      onFocus?.(event as React.FocusEvent<SVGElement>);
    },
    [interactive, disabled, onStateChange, onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLSpanElement | SVGElement>) => {
      if (interactive && !disabled) {
        dispatch('blur');
        onStateChange?.('default');
      }
      onBlur?.(event as React.FocusEvent<SVGElement>);
    },
    [interactive, disabled, onStateChange, onBlur]
  );

  const iconElement = icons[name];
  if (!iconElement) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const appliedColor = getInteractiveColor();
  const stateClasses = interactive
    ? `cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`
    : '';
  const focusClasses =
    interactive && !disabled
      ? 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded'
      : '';

  const iconWithClasses = React.cloneElement(iconElement, {
    className: `${sizeClasses[size]} ${appliedColor}`,
  });

  if (interactive) {
    // Filter out SVG-specific props for span wrapper
    const {
      // SVG attributes that should not be passed to span
      // fill,
      // stroke,
      // strokeWidth,
      // strokeLinecap,
      // strokeLinejoin,
      // strokeDasharray,
      // strokeDashoffset,
      // pathLength,
      // clipPath,
      // mask,
      // filter,
      // opacity,
      // transform,
      // style,
      // // Event handlers that should not be passed to span
      // onCopy,
      // onCut,
      // onPaste,
      // onCompositionEnd,
      // onCompositionStart,
      // onCompositionUpdate,
      // onSelect,
      // onBeforeInput,
      // onInput,
      ...spanProps
    } = props;

    return (
      <span
        className={`inline-block ${stateClasses} ${focusClasses} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={disabled ? undefined : 0}
        role="button"
        aria-disabled={disabled}
        {...(spanProps as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {iconWithClasses}
      </span>
    );
  }

  return React.cloneElement(iconElement, {
    className: `${sizeClasses[size]} ${appliedColor} ${className}`,
    ...props,
  });
};
