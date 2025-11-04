import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon Component', () => {
  describe('Rendering', () => {
    it('should render leaf icon', () => {
      render(<Icon name="leaf" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render accessibility icon', () => {
      render(<Icon name="accessibility" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render x icon', () => {
      render(<Icon name="x" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render handshake icon', () => {
      render(<Icon name="handshake" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render arrow-left icon', () => {
      render(<Icon name="arrow-left" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should return null for invalid icon name', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { container } = render(<Icon name={'invalid' as never} />);
      expect(container.firstChild).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Icon "invalid" not found');
      consoleSpy.mockRestore();
    });
  });

  describe('Sizes', () => {
    it('should apply extra small size classes', () => {
      render(<Icon name="leaf" size="xs" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-3', 'h-3');
    });

    it('should apply small size classes', () => {
      render(<Icon name="leaf" size="sm" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-4', 'h-4');
    });

    it('should apply medium size classes by default', () => {
      render(<Icon name="leaf" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-6', 'h-6');
    });

    it('should apply large size classes', () => {
      render(<Icon name="leaf" size="lg" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-8', 'h-8');
    });

    it('should apply extra large size classes', () => {
      render(<Icon name="leaf" size="xl" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-10', 'h-10');
    });
  });

  describe('Colors', () => {
    it('should apply primary color classes', () => {
      render(<Icon name="leaf" color="primary" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-primary');
    });

    it('should apply secondary color classes', () => {
      render(<Icon name="leaf" color="secondary" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-secondary');
    });

    it('should apply muted color classes', () => {
      render(<Icon name="leaf" color="muted" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-muted-foreground');
    });

    it('should apply destructive color classes', () => {
      render(<Icon name="leaf" color="destructive" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-destructive');
    });

    it('should apply foreground color classes by default', () => {
      render(<Icon name="leaf" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-foreground');
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className', () => {
      render(<Icon name="leaf" className="custom-class" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('custom-class');
    });

    it('should pass through other SVG props', () => {
      render(
        <Icon
          name="leaf"
          data-testid="icon"
          aria-label="Custom leaf icon"
          role="img"
        />
      );
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-label', 'Custom leaf icon');
      expect(icon).toHaveAttribute('role', 'img');
    });
  });

  describe('Interactive States', () => {
    it('should render as non-interactive by default', () => {
      render(<Icon name="leaf" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).not.toHaveAttribute('role', 'button');
      expect(icon).not.toHaveAttribute('tabIndex');
    });

    it('should render as interactive when interactive prop is true', () => {
      render(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('role', 'button');
      expect(icon).toHaveAttribute('tabIndex', '0');
    });

    it('should apply correct color variant classes for primary', () => {
      const { container } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="primary"
          data-testid="icon"
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-primary');
    });

    it('should apply correct color variant classes for secondary', () => {
      const { container } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="secondary"
          data-testid="icon"
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-white');
    });

    it('should apply correct color variant classes for tertiary', () => {
      const { container } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="tertiary"
          data-testid="icon"
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-gray-600');
    });

    it('should handle mouse events when interactive', () => {
      const onStateChange = jest.fn();
      render(
        <Icon
          name="leaf"
          interactive
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = screen.getByTestId('icon');

      fireEvent.mouseEnter(icon);
      expect(onStateChange).toHaveBeenCalledWith('hover');

      fireEvent.mouseLeave(icon);
      expect(onStateChange).toHaveBeenCalledWith('default');
    });

    it('should handle focus events when interactive', () => {
      const onStateChange = jest.fn();
      render(
        <Icon
          name="leaf"
          interactive
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = screen.getByTestId('icon');

      fireEvent.focus(icon);
      expect(onStateChange).toHaveBeenCalledWith('focus');

      fireEvent.blur(icon);
      expect(onStateChange).toHaveBeenCalledWith('default');
    });

    it('should not handle events when disabled', () => {
      const onStateChange = jest.fn();
      render(
        <Icon
          name="leaf"
          interactive
          disabled
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = screen.getByTestId('icon');

      fireEvent.mouseEnter(icon);
      fireEvent.focus(icon);
      expect(onStateChange).not.toHaveBeenCalled();
    });

    it('should apply disabled styles when disabled', () => {
      render(<Icon name="leaf" interactive disabled data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('cursor-not-allowed', 'opacity-50');
      expect(icon).toHaveAttribute('aria-disabled', 'true');
    });

    it('should use controlled state when provided', () => {
      const { container } = render(
        <Icon name="leaf" interactive state="hover" data-testid="icon" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-primary-600');
    });

    it('should apply focus ring styles when interactive', () => {
      render(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary'
      );
    });
  });

  describe('Color Variants', () => {
    it('should apply primary variant colors correctly', () => {
      const { container: defaultContainer } = render(
        <Icon name="leaf" interactive colorVariant="primary" state="default" />
      );
      const { container: hoverContainer } = render(
        <Icon name="leaf" interactive colorVariant="primary" state="hover" />
      );
      const { container: disabledContainer } = render(
        <Icon name="leaf" interactive colorVariant="primary" state="disabled" />
      );

      const defaultSvg = defaultContainer.querySelector('svg');
      const hoverSvg = hoverContainer.querySelector('svg');
      const disabledSvg = disabledContainer.querySelector('svg');

      expect(defaultSvg).toHaveClass('text-primary');
      expect(hoverSvg).toHaveClass('text-primary-600');
      expect(disabledSvg).toHaveClass('text-gray-400');
    });

    it('should apply secondary variant colors correctly', () => {
      const { container: defaultContainer } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="secondary"
          state="default"
        />
      );
      const { container: hoverContainer } = render(
        <Icon name="leaf" interactive colorVariant="secondary" state="hover" />
      );
      const { container: disabledContainer } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="secondary"
          state="disabled"
        />
      );

      const defaultSvg = defaultContainer.querySelector('svg');
      const hoverSvg = hoverContainer.querySelector('svg');
      const disabledSvg = disabledContainer.querySelector('svg');

      expect(defaultSvg).toHaveClass('text-white');
      expect(hoverSvg).toHaveClass('text-white');
      expect(disabledSvg).toHaveClass('text-gray-400');
    });

    it('should apply tertiary variant colors correctly', () => {
      const { container: defaultContainer } = render(
        <Icon name="leaf" interactive colorVariant="tertiary" state="default" />
      );
      const { container: hoverContainer } = render(
        <Icon name="leaf" interactive colorVariant="tertiary" state="hover" />
      );
      const { container: disabledContainer } = render(
        <Icon
          name="leaf"
          interactive
          colorVariant="tertiary"
          state="disabled"
        />
      );

      const defaultSvg = defaultContainer.querySelector('svg');
      const hoverSvg = hoverContainer.querySelector('svg');
      const disabledSvg = disabledContainer.querySelector('svg');

      expect(defaultSvg).toHaveClass('text-gray-600');
      expect(hoverSvg).toHaveClass('text-gray-700');
      expect(disabledSvg).toHaveClass('text-gray-400');
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain backward compatibility with color prop', () => {
      render(<Icon name="leaf" color="primary" data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-primary');
    });

    it('should prefer semantic colors when not interactive', () => {
      render(
        <Icon
          name="leaf"
          color="destructive"
          colorVariant="secondary"
          data-testid="icon"
        />
      );
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-destructive');
    });

    it('should use colorVariant when interactive', () => {
      const { container } = render(
        <Icon
          name="leaf"
          color="destructive"
          colorVariant="secondary"
          interactive
          data-testid="icon"
        />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-white');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with proper attributes', () => {
      render(<Icon name="accessibility" aria-label="Accessibility icon" />);
      const icon = screen.getByLabelText('Accessibility icon');
      expect(icon).toBeInTheDocument();
    });

    it('should support keyboard navigation when interactive', () => {
      render(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = screen.getByTestId('icon');

      expect(icon).toHaveAttribute('role', 'button');
      expect(icon).toHaveAttribute('tabIndex', '0');

      icon.focus();
      expect(icon).toHaveFocus();
    });

    it('should have proper ARIA attributes when disabled', () => {
      render(<Icon name="leaf" interactive disabled data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
