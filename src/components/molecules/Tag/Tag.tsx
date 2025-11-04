import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';

export interface TagProps {
  endIcon?: boolean;
  startIcon?: boolean;
  showText?: boolean;
  text?: string;
  color?: 'yellow' | 'gray' | 'blue' | 'green' | 'orange' | 'pink' | 'purple';
  size?: 'l' | 'm' | 's';
  type?: 'negative' | 'positive';
  className?: string;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  endIcon = true,
  startIcon = true,
  showText = true,
  text = 'Tag',
  color = 'blue',
  size = 'm',
  type = 'positive',
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    s: 'px-2 py-1 text-xs gap-1',
    m: 'px-3 py-1.5 text-sm gap-2',
    l: 'px-4 py-2 text-base gap-2',
  };

  const colorClasses = {
    positive: {
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    negative: {
      yellow: 'bg-yellow-800 text-yellow-100 border-yellow-700',
      gray: 'bg-gray-800 text-gray-100 border-gray-700',
      blue: 'bg-blue-800 text-blue-100 border-blue-700',
      green: 'bg-green-800 text-green-100 border-green-700',
      orange: 'bg-orange-800 text-orange-100 border-orange-700',
      pink: 'bg-pink-800 text-pink-100 border-pink-700',
      purple: 'bg-purple-800 text-purple-100 border-purple-700',
    },
  };

  const iconColorClasses = {
    positive: {
      yellow: 'text-yellow-800',
      gray: 'text-gray-800',
      blue: 'text-blue-800',
      green: 'text-green-800',
      orange: 'text-orange-800',
      pink: 'text-pink-800',
      purple: 'text-purple-800',
    },
    negative: {
      yellow: 'text-yellow-100',
      gray: 'text-gray-100',
      blue: 'text-blue-100',
      green: 'text-green-100',
      orange: 'text-orange-100',
      pink: 'text-pink-100',
      purple: 'text-purple-100',
    },
  };

  const iconSize = size === 's' ? 'xs' : size === 'm' ? 'sm' : 'md';

  const baseClasses =
    'inline-flex items-center border rounded-full font-medium';
  const appliedColorClasses = colorClasses[type][color];
  const appliedSizeClasses = sizeClasses[size];
  const iconColorClass = iconColorClasses[type][color];

  return (
    <div
      className={`${baseClasses} ${appliedColorClasses} ${appliedSizeClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {startIcon && (
        <Icon name="arrow-left" size={iconSize} className={iconColorClass} />
      )}

      {showText && <span>{text}</span>}

      {endIcon && <Icon name="x" size={iconSize} className={iconColorClass} />}
    </div>
  );
};
