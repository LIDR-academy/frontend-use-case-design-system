import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button Component', () => {
  test.describe('Rendering', () => {
    test('should render button with text', async ({ mount }) => {
      const component = await mount(<Button>Click me</Button>);
      await expect(component.getByRole('button', { name: /click me/i })).toBeVisible();
    });

    test('should render with default variant and size', async ({ mount }) => {
      const component = await mount(<Button>Default Button</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/bg-primary/);
      await expect(button).toHaveClass(/h-10/);
    });
  });

  test.describe('Variants', () => {
    test('should apply primary variant classes', async ({ mount }) => {
      const component = await mount(<Button variant="primary">Primary</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/bg-primary/);
      await expect(button).toHaveClass(/text-primary-foreground/);
    });

    test('should apply secondary variant classes', async ({ mount }) => {
      const component = await mount(<Button variant="secondary">Secondary</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/bg-secondary/);
      await expect(button).toHaveClass(/text-secondary-foreground/);
    });

    test('should apply outline variant classes', async ({ mount }) => {
      const component = await mount(<Button variant="outline">Outline</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/border-input/);
      await expect(button).toHaveClass(/bg-background/);
    });
  });

  test.describe('Sizes', () => {
    test('should apply small size classes', async ({ mount }) => {
      const component = await mount(<Button size="sm">Small</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/h-8/);
      await expect(button).toHaveClass(/px-3/);
    });

    test('should apply medium size classes', async ({ mount }) => {
      const component = await mount(<Button size="md">Medium</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/h-10/);
      await expect(button).toHaveClass(/px-4/);
    });

    test('should apply large size classes', async ({ mount }) => {
      const component = await mount(<Button size="lg">Large</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveClass(/h-12/);
      await expect(button).toHaveClass(/px-6/);
    });
  });

  test.describe('States', () => {
    test('should be disabled when disabled prop is true', async ({ mount }) => {
      const component = await mount(<Button disabled>Disabled</Button>);
      const button = component.getByRole('button');
      await expect(button).toBeDisabled();
      await expect(button).toHaveClass(/disabled:opacity-50/);
    });

    test('should not be disabled when disabled prop is false', async ({ mount }) => {
      const component = await mount(<Button disabled={false}>Enabled</Button>);
      const button = component.getByRole('button');
      await expect(button).not.toBeDisabled();
    });
  });

  test.describe('Interactions', () => {
    test('should call onClick handler when clicked', async ({ mount }) => {
      let clickCount = 0;
      const handleClick = () => {
        clickCount++;
      };

      const component = await mount(<Button onClick={handleClick}>Click me</Button>);
      const button = component.getByRole('button');
      
      await button.click();
      expect(clickCount).toBe(1);
    });

    test('should not call onClick when disabled', async ({ mount }) => {
      let clickCount = 0;
      const handleClick = () => {
        clickCount++;
      };

      const component = await mount(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = component.getByRole('button');
      
      await button.click({ force: true });
      expect(clickCount).toBe(0);
    });

    test('should receive focus when tabbed to', async ({ mount }) => {
      const component = await mount(<Button>Focusable</Button>);
      const button = component.getByRole('button');
      
      await button.focus();
      await expect(button).toBeFocused();
    });
  });

  test.describe('Additional Props', () => {
    test('should spread additional props to button element', async ({ mount }) => {
      const component = await mount(
        <Button data-testid="custom-button" aria-label="Custom Label">
          Button
        </Button>
      );
      const button = component.getByTestId('custom-button');
      await expect(button).toHaveAttribute('aria-label', 'Custom Label');
    });

    test('should apply custom className alongside default classes', async ({ mount }) => {
      const component = await mount(<Button className="custom-class">Custom</Button>);
      const button = component.getByRole('button');
      
      await expect(button).toHaveClass(/custom-class/);
      await expect(button).toHaveClass(/inline-flex/);
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ mount }) => {
      const component = await mount(<Button>Accessible Button</Button>);
      const button = component.getByRole('button');
      await expect(button).toHaveAttribute('type', 'button');
    });

    test('should support aria-label', async ({ mount }) => {
      const component = await mount(<Button aria-label="Close dialog">X</Button>);
      await expect(component.getByRole('button', { name: /close dialog/i })).toBeVisible();
    });

    test('should have disabled attribute when disabled', async ({ mount }) => {
      const component = await mount(<Button disabled>Disabled</Button>);
      const button = component.getByRole('button');
      await expect(button).toBeDisabled();
    });
  });
});

