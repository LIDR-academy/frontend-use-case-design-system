import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Tag component following Figma design system specifications.
 * A molecule component that combines icons and text to display labels.
 *
 * @example
 * ```tsx
 * <Tag variant="positive-green" onRemove={() => console.log('removed')}>
 *   Tag
 * </Tag>
 * ```
 */
export interface TagProps {
  /** Visual style variant following Figma design tokens */
  variant?:
    | 'positive-green'
    | 'positive-blue'
    | 'positive-yellow'
    | 'positive-gray'
    | 'positive-orange'
    | 'positive-pink'
    | 'positive-purple'
    | 'negative-green'
    | 'negative-blue'
    | 'negative-yellow'
    | 'negative-gray'
    | 'negative-orange'
    | 'negative-pink'
    | 'negative-purple';
  /** Whether to show the start icon (arrow) */
  showStartIcon?: boolean;
  /** Whether to show the end icon (close/x) */
  showEndIcon?: boolean;
  /** Text content of the tag */
  children: React.ReactNode;
  /** Handler called when end icon (close) is clicked */
  onRemove?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

export const Tag: React.FC<TagProps> = ({
  variant = 'positive-green',
  showStartIcon = true,
  showEndIcon = true,
  children,
  onRemove,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // Figma design tokens mapped to Tailwind classes
  const variantClasses = {
    'positive-green': {
      container: 'bg-[#dafaeb] text-[#075e45]',
      icon: 'text-[#075e45]',
    },
    'positive-blue': {
      container: 'bg-blue-100 text-blue-800',
      icon: 'text-blue-800',
    },
    'positive-yellow': {
      container: 'bg-yellow-100 text-yellow-800',
      icon: 'text-yellow-800',
    },
    'positive-gray': {
      container: 'bg-gray-100 text-gray-800',
      icon: 'text-gray-800',
    },
    'positive-orange': {
      container: 'bg-orange-100 text-orange-800',
      icon: 'text-orange-800',
    },
    'positive-pink': {
      container: 'bg-pink-100 text-pink-800',
      icon: 'text-pink-800',
    },
    'positive-purple': {
      container: 'bg-purple-100 text-purple-800',
      icon: 'text-purple-800',
    },
    'negative-green': {
      container: 'bg-green-800 text-green-100',
      icon: 'text-green-100',
    },
    'negative-blue': {
      container: 'bg-blue-800 text-blue-100',
      icon: 'text-blue-100',
    },
    'negative-yellow': {
      container: 'bg-yellow-800 text-yellow-100',
      icon: 'text-yellow-100',
    },
    'negative-gray': {
      container: 'bg-gray-800 text-gray-100',
      icon: 'text-gray-100',
    },
    'negative-orange': {
      container: 'bg-orange-800 text-orange-100',
      icon: 'text-orange-100',
    },
    'negative-pink': {
      container: 'bg-pink-800 text-pink-100',
      icon: 'text-pink-100',
    },
    'negative-purple': {
      container: 'bg-purple-800 text-purple-100',
      icon: 'text-purple-100',
    },
  };

  const { container, icon: iconColor } = variantClasses[variant];

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove?.();
  };

  const handleRemoveKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onRemove?.();
    }
  };

  // Build class string
  const baseClasses =
    'inline-flex items-center justify-center px-2 py-1.5 gap-1 rounded font-["Montserrat"] font-medium text-xs leading-3';
  const allClasses = `${baseClasses} ${container} ${className}`;

  return (
    <div className={allClasses} aria-label={ariaLabel || `Tag: ${children}`}>
      {showStartIcon && (
        <Icon
          name="arrow-left"
          size="xs"
          className={`w-3 h-3 ${iconColor}`}
          aria-hidden="true"
        />
      )}

      <span className="text-center">{children}</span>

      {showEndIcon && (
        <button
          type="button"
          onClick={handleRemoveClick}
          onKeyDown={handleRemoveKeyDown}
          className={`inline-flex items-center justify-center w-3 h-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded-sm transition-opacity hover:opacity-70 ${iconColor}`}
          aria-label={`Remove ${children}`}
          tabIndex={0}
        >
          <Icon name="x" size="xs" className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

Tag.displayName = 'Tag';
