import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * Position of the tooltip relative to the trigger element
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Delay in milliseconds before showing the tooltip
   * @default 200
   */
  showDelay?: number;
  /**
   * Delay in milliseconds before hiding the tooltip
   * @default 0
   */
  hideDelay?: number;
  /**
   * The trigger element that activates the tooltip
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for the tooltip container
   */
  className?: string;
}

/**
 * Tooltip component - displays contextual information on hover or focus
 *
 * @example
 * ```tsx
 * <Tooltip content="This is a helpful tip" position="top">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  showDelay = 200,
  hideDelay = 0,
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useRef(
    `tooltip-${Math.random().toString(36).substr(2, 9)}`
  );

  const clearTimeouts = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleShow = () => {
    clearTimeouts();
    setShouldRender(true);
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  };

  const handleHide = () => {
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 300);
    }, hideDelay);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        clearTimeouts();
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 300);
        }, hideDelay);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeouts();
    };
  }, [isVisible, hideDelay]);

  // Position-specific classes for tooltip
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  // Arrow position classes
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 rotate-180',
    left: 'left-full top-1/2 -translate-y-1/2 rotate-90',
    right: 'right-full top-1/2 -translate-y-1/2 -rotate-90',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      aria-describedby={isVisible ? tooltipId.current : undefined}
    >
      {children}
      {shouldRender && (
        <div
          ref={tooltipRef}
          id={tooltipId.current}
          role="tooltip"
          className={`
            absolute z-50
            ${positionClasses[position]}
            ${isVisible ? 'animate-fade-in animate-scale-in' : 'opacity-0'}
            ${className}
          `}
          style={{
            pointerEvents: 'none',
          }}
        >
          <div className="bg-[#FEE9BD] rounded-lg shadow-md px-4 py-3 flex items-center justify-center gap-6">
            <p className="font-light text-base leading-6 text-[#333333] whitespace-nowrap">
              {content}
            </p>
          </div>
          {/* CSS Arrow */}
          <div
            className={`
              absolute w-0 h-0
              ${arrowClasses[position]}
            `}
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #FEE9BD',
            }}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
