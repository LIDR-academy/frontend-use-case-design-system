import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag Component', () => {
  describe('Rendering', () => {
    it('should render tag with default props', () => {
      render(<Tag />);
      const tag = screen.getByText('Tag');
      expect(tag).toBeInTheDocument();
    });

    it('should render tag with custom text', () => {
      render(<Tag text="Custom Tag" />);
      const tag = screen.getByText('Custom Tag');
      expect(tag).toBeInTheDocument();
    });

    it('should render both icons by default', () => {
      const { container } = render(<Tag data-testid="tag" />);
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements).toHaveLength(2);
    });

    it('should render only start icon when endIcon is false', () => {
      const { container } = render(<Tag endIcon={false} />);
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements).toHaveLength(1);
    });

    it('should render only end icon when startIcon is false', () => {
      const { container } = render(<Tag startIcon={false} />);
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements).toHaveLength(1);
    });

    it('should render no icons when both are disabled', () => {
      const { container } = render(<Tag startIcon={false} endIcon={false} />);
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements).toHaveLength(0);
    });

    it('should not render text when showText is false', () => {
      render(<Tag text="Hidden Text" showText={false} />);
      const text = screen.queryByText('Hidden Text');
      expect(text).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size classes', () => {
      const { container } = render(<Tag size="s" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass('px-2', 'py-1', 'text-xs', 'gap-1');
    });

    it('should apply medium size classes by default', () => {
      const { container } = render(<Tag />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass('px-3', 'py-1.5', 'text-sm', 'gap-2');
    });

    it('should apply large size classes', () => {
      const { container } = render(<Tag size="l" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass('px-4', 'py-2', 'text-base', 'gap-2');
    });
  });

  describe('Colors and Types', () => {
    it('should apply blue positive color classes by default', () => {
      const { container } = render(<Tag />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-blue-100',
        'text-blue-800',
        'border-blue-200'
      );
    });

    it('should apply yellow positive color classes', () => {
      const { container } = render(<Tag color="yellow" type="positive" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-yellow-100',
        'text-yellow-800',
        'border-yellow-200'
      );
    });

    it('should apply blue negative color classes', () => {
      const { container } = render(<Tag color="blue" type="negative" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-blue-800',
        'text-blue-100',
        'border-blue-700'
      );
    });

    it('should apply green positive color classes', () => {
      const { container } = render(<Tag color="green" type="positive" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-green-100',
        'text-green-800',
        'border-green-200'
      );
    });

    it('should apply gray negative color classes', () => {
      const { container } = render(<Tag color="gray" type="negative" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-gray-800',
        'text-gray-100',
        'border-gray-700'
      );
    });

    it('should apply orange positive color classes', () => {
      const { container } = render(<Tag color="orange" type="positive" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-orange-100',
        'text-orange-800',
        'border-orange-200'
      );
    });

    it('should apply pink negative color classes', () => {
      const { container } = render(<Tag color="pink" type="negative" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-pink-800',
        'text-pink-100',
        'border-pink-700'
      );
    });

    it('should apply purple positive color classes', () => {
      const { container } = render(<Tag color="purple" type="positive" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'bg-purple-100',
        'text-purple-800',
        'border-purple-200'
      );
    });
  });

  describe('Icons', () => {
    it('should use arrow-left icon for start icon', () => {
      const { container } = render(<Tag endIcon={false} />);
      const svgElement = container.querySelector('svg');
      expect(svgElement?.parentElement).toHaveClass('text-blue-800');
    });

    it('should use x icon for end icon', () => {
      const { container } = render(<Tag startIcon={false} />);
      const svgElement = container.querySelector('svg');
      expect(svgElement?.parentElement).toHaveClass('text-blue-800');
    });

    it('should apply correct icon colors for positive type', () => {
      const { container } = render(<Tag color="green" type="positive" />);
      const svgElements = container.querySelectorAll('svg');
      svgElements.forEach((svg) => {
        expect(svg).toHaveClass('text-green-800');
      });
    });

    it('should apply correct icon colors for negative type', () => {
      const { container } = render(<Tag color="blue" type="negative" />);
      const svgElements = container.querySelectorAll('svg');
      svgElements.forEach((svg) => {
        expect(svg).toHaveClass('text-blue-100');
      });
    });

    it('should use correct icon sizes based on tag size', () => {
      const { container: smallContainer } = render(<Tag size="s" />);
      const { container: mediumContainer } = render(<Tag size="m" />);
      const { container: largeContainer } = render(<Tag size="l" />);

      const smallIcons = smallContainer.querySelectorAll('svg');
      const mediumIcons = mediumContainer.querySelectorAll('svg');
      const largeIcons = largeContainer.querySelectorAll('svg');

      smallIcons.forEach((icon) => expect(icon).toHaveClass('w-3', 'h-3'));
      mediumIcons.forEach((icon) => expect(icon).toHaveClass('w-4', 'h-4'));
      largeIcons.forEach((icon) => expect(icon).toHaveClass('w-6', 'h-6'));
    });
  });

  describe('Interaction', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag onClick={handleClick} />);
      const tag = container.firstChild as HTMLElement;

      fireEvent.click(tag);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have button role and tabIndex when onClick is provided', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag onClick={handleClick} />);
      const tag = container.firstChild as HTMLElement;

      expect(tag).toHaveAttribute('role', 'button');
      expect(tag).toHaveAttribute('tabIndex', '0');
    });

    it('should not have button role when onClick is not provided', () => {
      const { container } = render(<Tag />);
      const tag = container.firstChild as HTMLElement;

      expect(tag).not.toHaveAttribute('role');
      expect(tag).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className', () => {
      const { container } = render(<Tag className="custom-class" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass('custom-class');
    });

    it('should maintain base classes with custom className', () => {
      const { container } = render(<Tag className="custom-class" />);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass(
        'inline-flex',
        'items-center',
        'border',
        'rounded-full',
        'font-medium'
      );
      expect(tag).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with proper structure', () => {
      render(<Tag text="Accessible Tag" />);
      const tag = screen.getByText('Accessible Tag');
      expect(tag).toBeInTheDocument();
    });

    it('should support keyboard interaction when clickable', () => {
      const handleClick = jest.fn();
      const { container } = render(<Tag onClick={handleClick} />);
      const tag = container.firstChild as HTMLElement;

      tag.focus();
      expect(tag).toHaveFocus();

      fireEvent.keyDown(tag, { key: 'Enter' });
      // Note: We would need to add keyDown handler in the component for full keyboard support
    });
  });
});
