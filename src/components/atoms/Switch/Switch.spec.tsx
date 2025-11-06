import { test, expect } from '@playwright/experimental-ct-react';
import { Switch } from './Switch';
import AxeBuilder from '@axe-core/playwright';

test.describe('Switch Component', () => {
  test.describe('Rendering', () => {
    test('should render with default props', async ({ mount }) => {
      const component = await mount(<Switch />);
      await expect(component).toBeVisible();
    });

    test('should render in unchecked state by default', async ({ mount }) => {
      const component = await mount(<Switch />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-checked', 'false');
    });

    test('should render in checked state when checked prop is true', async ({
      mount,
    }) => {
      const component = await mount(<Switch checked={true} />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-checked', 'true');
    });

    test('should render with label when provided', async ({ mount }) => {
      const component = await mount(<Switch label="Enable notifications" />);
      await expect(component.getByText('Enable notifications')).toBeVisible();
    });

    test('should render hidden checkbox input', async ({ mount }) => {
      const component = await mount(<Switch />);
      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).toBeAttached();
      await expect(checkbox).toHaveClass(/sr-only/);
    });
  });

  test.describe('Size Variants', () => {
    test('should render small size variant', async ({ mount }) => {
      const component = await mount(<Switch size="sm" />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/h-5/);
      await expect(button).toHaveClass(/w-9/);
    });

    test('should render medium size variant (default)', async ({ mount }) => {
      const component = await mount(<Switch size="md" />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/h-6/);
      await expect(button).toHaveClass(/w-11/);
    });

    test('should render large size variant', async ({ mount }) => {
      const component = await mount(<Switch size="lg" />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/h-7/);
      await expect(button).toHaveClass(/w-14/);
    });
  });

  test.describe('Interactions', () => {
    test('should toggle state when clicked', async ({ mount }) => {
      let currentChecked = false;
      const component = await mount(
        <Switch
          checked={currentChecked}
          onCheckedChange={(checked) => {
            currentChecked = checked;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.click();

      expect(currentChecked).toBe(true);
    });

    test('should call onCheckedChange with correct value', async ({
      mount,
    }) => {
      const checkedValues: boolean[] = [];
      let isChecked = false;
      const component = await mount(
        <Switch
          checked={isChecked}
          onCheckedChange={(checked) => {
            checkedValues.push(checked);
            isChecked = checked;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.click();
      await component.update(
        <Switch
          checked={isChecked}
          onCheckedChange={(checked) => {
            checkedValues.push(checked);
            isChecked = checked;
          }}
        />
      );
      await button.click();

      expect(checkedValues).toEqual([true, false]);
    });

    test('should not trigger onCheckedChange when disabled', async ({
      mount,
    }) => {
      let callCount = 0;
      const component = await mount(
        <Switch
          disabled
          onCheckedChange={() => {
            callCount++;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.click({ force: true });

      expect(callCount).toBe(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should toggle when Space key is pressed', async ({ mount }) => {
      let currentChecked = false;
      const component = await mount(
        <Switch
          checked={currentChecked}
          onCheckedChange={(checked) => {
            currentChecked = checked;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.focus();
      await button.press(' ');

      expect(currentChecked).toBe(true);
    });

    test('should toggle when Enter key is pressed', async ({ mount }) => {
      let currentChecked = false;
      const component = await mount(
        <Switch
          checked={currentChecked}
          onCheckedChange={(checked) => {
            currentChecked = checked;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.focus();
      await button.press('Enter');

      expect(currentChecked).toBe(true);
    });

    test('should be focusable with Tab key', async ({ mount }) => {
      const component = await mount(
        <div>
          <button>Before</button>
          <Switch label="Test switch" />
          <button>After</button>
        </div>
      );

      // Click first button to establish focus
      const firstButton = component.getByRole('button', { name: 'Before' });
      await firstButton.click();

      // Tab to switch
      await component.page().keyboard.press('Tab');

      const switchButton = component.getByRole('switch');
      await expect(switchButton).toBeFocused();
    });

    test('should not respond to keyboard when disabled', async ({ mount }) => {
      let callCount = 0;
      const component = await mount(
        <Switch
          disabled
          onCheckedChange={() => {
            callCount++;
          }}
        />
      );

      const button = component.getByRole('switch');
      await button.focus();
      await button.press(' ');
      await button.press('Enter');

      expect(callCount).toBe(0);
    });
  });

  test.describe('Disabled State', () => {
    test('should apply disabled styling', async ({ mount }) => {
      const component = await mount(<Switch disabled />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/opacity-50/);
      await expect(button).toHaveClass(/cursor-not-allowed/);
    });

    test('should have disabled attribute', async ({ mount }) => {
      const component = await mount(<Switch disabled />);
      const button = component.getByRole('switch');
      await expect(button).toBeDisabled();
    });

    test('should disable hidden checkbox input', async ({ mount }) => {
      const component = await mount(<Switch disabled />);
      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).toBeDisabled();
    });

    test('should apply disabled styling to label', async ({ mount }) => {
      const component = await mount(
        <Switch disabled label="Disabled switch" />
      );
      const label = component.getByText('Disabled switch');
      await expect(label).toHaveClass(/opacity-50/);
      await expect(label).toHaveClass(/cursor-not-allowed/);
    });
  });

  test.describe('ARIA and Accessibility', () => {
    test('should have role="switch"', async ({ mount }) => {
      const component = await mount(<Switch />);
      const button = component.getByRole('switch');
      await expect(button).toBeVisible();
    });

    test('should have correct aria-checked attribute when unchecked', async ({
      mount,
    }) => {
      const component = await mount(<Switch checked={false} />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-checked', 'false');
    });

    test('should have correct aria-checked attribute when checked', async ({
      mount,
    }) => {
      const component = await mount(<Switch checked={true} />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-checked', 'true');
    });

    test('should have aria-label from label prop', async ({ mount }) => {
      const component = await mount(<Switch label="Test label" />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-label', 'Test label');
    });

    test('should support custom aria-label', async ({ mount }) => {
      const component = await mount(<Switch aria-label="Custom ARIA label" />);
      const button = component.getByRole('switch');
      await expect(button).toHaveAttribute('aria-label', 'Custom ARIA label');
    });

    test('should have visible focus indicator', async ({ mount, page }) => {
      await mount(<Switch />);
      const button = page.getByRole('switch');

      await button.focus();

      // Check that focus-visible styles are applied
      const hasRing = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return (
          el.className.includes('focus-visible:ring') ||
          styles.outline !== 'none'
        );
      });

      expect(hasRing).toBe(true);
    });

    test('should not have accessibility violations', async ({
      mount,
      page,
    }) => {
      await mount(<Switch label="Accessible switch" />);

      const results = await new AxeBuilder({ page })
        .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('should not have accessibility violations when checked', async ({
      mount,
      page,
    }) => {
      await mount(<Switch checked label="Accessible switch checked" />);

      const results = await new AxeBuilder({ page })
        .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test('should not have accessibility violations when disabled', async ({
      mount,
      page,
    }) => {
      await mount(<Switch disabled label="Accessible switch disabled" />);

      const results = await new AxeBuilder({ page })
        .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Form Integration', () => {
    test('should have associated hidden checkbox input', async ({ mount }) => {
      const component = await mount(<Switch />);
      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).toBeAttached();
    });

    test('should sync checkbox state with switch state', async ({ mount }) => {
      const component = await mount(<Switch checked={true} />);
      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).toBeChecked();
    });

    test('should support controlled checkbox state', async ({ mount }) => {
      let isChecked = false;
      const component = await mount(
        <Switch
          checked={isChecked}
          onCheckedChange={(checked) => {
            isChecked = checked;
          }}
        />
      );

      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).not.toBeChecked();

      const button = component.getByRole('switch');
      await button.click();

      expect(isChecked).toBe(true);
    });
  });

  test.describe('Visual States', () => {
    test('should apply correct background color when unchecked', async ({
      mount,
    }) => {
      const component = await mount(<Switch checked={false} />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/bg-input/);
    });

    test('should apply correct background color when checked', async ({
      mount,
    }) => {
      const component = await mount(<Switch checked={true} />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/bg-primary/);
    });

    test('should have transition classes for smooth animation', async ({
      mount,
    }) => {
      const component = await mount(<Switch />);
      const button = component.getByRole('switch');
      await expect(button).toHaveClass(/transition-colors/);
      await expect(button).toHaveClass(/duration-200/);
    });

    test('should translate thumb when checked', async ({ mount }) => {
      const component = await mount(<Switch checked={true} size="md" />);
      const thumb = component.locator('span[aria-hidden="true"]');
      await expect(thumb).toHaveClass(/translate-x-5/);
    });

    test('should not translate thumb when unchecked', async ({ mount }) => {
      const component = await mount(<Switch checked={false} />);
      const thumb = component.locator('span[aria-hidden="true"]');
      await expect(thumb).toHaveClass(/translate-x-0/);
    });
  });

  test.describe('Custom Props', () => {
    test('should accept custom className', async ({ mount }) => {
      const component = await mount(<Switch className="custom-class-name" />);
      // The className is applied to the root div wrapper
      const container = component.locator('div').first();
      await expect(container).toBeVisible();
      await expect(container).toHaveClass(/custom-class-name/);
    });

    test('should accept custom id', async ({ mount }) => {
      const component = await mount(<Switch id="custom-id" />);
      const checkbox = component.locator('#custom-id');
      await expect(checkbox).toBeAttached();
    });

    test('should forward HTML input attributes', async ({ mount }) => {
      const component = await mount(
        <Switch name="test-switch" data-testid="switch-test" />
      );
      const checkbox = component.locator('input[type="checkbox"]');
      await expect(checkbox).toHaveAttribute('name', 'test-switch');
      await expect(checkbox).toHaveAttribute('data-testid', 'switch-test');
    });
  });
});
