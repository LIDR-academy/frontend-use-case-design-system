import { test, expect } from '@playwright/experimental-ct-react';
import { Icon } from './Icon';

test.describe('Icon Component', () => {
  test.describe('Rendering', () => {
    test('should render leaf icon', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" data-testid="icon" />);
      await expect(component.getByTestId('icon')).toBeVisible();
    });

    test('should render accessibility icon', async ({ mount }) => {
      const component = await mount(<Icon name="accessibility" data-testid="icon" />);
      await expect(component.getByTestId('icon')).toBeVisible();
    });

    test('should render x icon', async ({ mount }) => {
      const component = await mount(<Icon name="x" data-testid="icon" />);
      await expect(component.getByTestId('icon')).toBeVisible();
    });

    test('should render handshake icon', async ({ mount }) => {
      const component = await mount(<Icon name="handshake" data-testid="icon" />);
      await expect(component.getByTestId('icon')).toBeVisible();
    });

    test('should render arrow-left icon', async ({ mount }) => {
      const component = await mount(<Icon name="arrow-left" data-testid="icon" />);
      await expect(component.getByTestId('icon')).toBeVisible();
    });

    test('should return null for invalid icon name', async ({ mount, page }) => {
      // Listen for console warnings
      const warnings: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });

      const component = await mount(<Icon name={'invalid' as never} />);
      const icon = component.locator('[data-testid="icon"]');
      
      await expect(icon).not.toBeVisible();
      expect(warnings.some(w => w.includes('Icon "invalid" not found'))).toBeTruthy();
    });
  });

  test.describe('Sizes', () => {
    test('should apply extra small size classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" size="xs" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/w-3/);
      await expect(icon).toHaveClass(/h-3/);
    });

    test('should apply small size classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" size="sm" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/w-4/);
      await expect(icon).toHaveClass(/h-4/);
    });

    test('should apply medium size classes by default', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/w-6/);
      await expect(icon).toHaveClass(/h-6/);
    });

    test('should apply large size classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" size="lg" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/w-8/);
      await expect(icon).toHaveClass(/h-8/);
    });

    test('should apply extra large size classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" size="xl" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/w-10/);
      await expect(icon).toHaveClass(/h-10/);
    });
  });

  test.describe('Colors', () => {
    test('should apply primary color classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" color="primary" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/text-primary/);
    });

    test('should apply secondary color classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" color="secondary" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/text-secondary/);
    });

    test('should apply muted color classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" color="muted" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/text-muted-foreground/);
    });

    test('should apply destructive color classes', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" color="destructive" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/text-destructive/);
    });

    test('should apply foreground color classes by default', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/text-foreground/);
    });
  });

  test.describe('Custom Props', () => {
    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" className="custom-class" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/custom-class/);
    });

    test('should pass through other SVG props', async ({ mount }) => {
      const component = await mount(
        <Icon
          name="leaf"
          data-testid="icon"
          aria-label="Custom leaf icon"
          role="img"
        />
      );
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveAttribute('aria-label', 'Custom leaf icon');
      await expect(icon).toHaveAttribute('role', 'img');
    });
  });

  test.describe('Interactive States', () => {
    test('should render as non-interactive by default', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).not.toHaveAttribute('role', 'button');
      await expect(icon).not.toHaveAttribute('tabIndex');
    });

    test('should render as interactive when interactive prop is true', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveAttribute('role', 'button');
      await expect(icon).toHaveAttribute('tabIndex', '0');
    });

    test('should apply correct color variant classes for primary', async ({ mount }) => {
      const component = await mount(
        <Icon
          name="leaf"
          interactive
          colorVariant="primary"
          data-testid="icon"
        />
      );
      const svg = component.locator('svg').first();
      await expect(svg).toHaveClass(/text-primary/);
    });

    test('should apply correct color variant classes for secondary', async ({ mount }) => {
      const component = await mount(
        <Icon
          name="leaf"
          interactive
          colorVariant="secondary"
          data-testid="icon"
        />
      );
      const svg = component.locator('svg').first();
      await expect(svg).toHaveClass(/text-white/);
    });

    test('should apply correct color variant classes for tertiary', async ({ mount }) => {
      const component = await mount(
        <Icon
          name="leaf"
          interactive
          colorVariant="tertiary"
          data-testid="icon"
        />
      );
      const svg = component.locator('svg').first();
      await expect(svg).toHaveClass(/text-gray-600/);
    });

    test('should handle mouse events when interactive', async ({ mount }) => {
      const states: string[] = [];
      const onStateChange = (state: string) => {
        states.push(state);
      };

      const component = await mount(
        <Icon
          name="leaf"
          interactive
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = component.getByTestId('icon');

      await icon.hover();
      expect(states).toContain('hover');

      await component.locator('body').hover();
      expect(states).toContain('default');
    });

    test('should handle focus events when interactive', async ({ mount }) => {
      const states: string[] = [];
      const onStateChange = (state: string) => {
        states.push(state);
      };

      const component = await mount(
        <Icon
          name="leaf"
          interactive
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = component.getByTestId('icon');

      await icon.focus();
      expect(states).toContain('focus');

      await icon.blur();
      expect(states).toContain('default');
    });

    test('should not handle events when disabled', async ({ mount }) => {
      const states: string[] = [];
      const onStateChange = (state: string) => {
        states.push(state);
      };

      const component = await mount(
        <Icon
          name="leaf"
          interactive
          disabled
          onStateChange={onStateChange}
          data-testid="icon"
        />
      );
      const icon = component.getByTestId('icon');

      await icon.hover();
      await icon.focus();
      expect(states).toHaveLength(0);
    });

    test('should apply disabled styles when disabled', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" interactive disabled data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/cursor-not-allowed/);
      await expect(icon).toHaveClass(/opacity-50/);
      await expect(icon).toHaveAttribute('aria-disabled', 'true');
    });

    test('should use controlled state when provided', async ({ mount }) => {
      const component = await mount(
        <Icon name="leaf" interactive state="hover" data-testid="icon" />
      );
      const svg = component.locator('svg').first();
      await expect(svg).toHaveClass(/text-primary-600/);
    });

    test('should apply focus ring styles when interactive', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveClass(/focus:outline-none/);
      await expect(icon).toHaveClass(/focus:ring-2/);
      await expect(icon).toHaveClass(/focus:ring-primary/);
    });
  });

  test.describe('Accessibility', () => {
    test('should be accessible with proper attributes', async ({ mount }) => {
      const component = await mount(<Icon name="accessibility" aria-label="Accessibility icon" />);
      await expect(component.getByLabel('Accessibility icon')).toBeVisible();
    });

    test('should support keyboard navigation when interactive', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" interactive data-testid="icon" />);
      const icon = component.getByTestId('icon');

      await expect(icon).toHaveAttribute('role', 'button');
      await expect(icon).toHaveAttribute('tabIndex', '0');

      await icon.focus();
      await expect(icon).toBeFocused();
    });

    test('should have proper ARIA attributes when disabled', async ({ mount }) => {
      const component = await mount(<Icon name="leaf" interactive disabled data-testid="icon" />);
      const icon = component.getByTestId('icon');
      await expect(icon).toHaveAttribute('aria-disabled', 'true');
    });
  });
});

