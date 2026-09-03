import { test, expect } from '@playwright/experimental-ct-react';
import { AxeBuilder } from '@axe-core/playwright';
import { Switch } from './Switch';
import { useState } from 'react';

test.describe('Switch', () => {
  // Test generated from MCP browser interaction
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Switch label="Default Switch" />);
    await expect(component.getByRole('switch')).toBeVisible();
    await expect(component.getByText('Default Switch')).toBeVisible();
  });

  // Test generated from MCP console error monitoring
  test('should render without console errors', async ({ mount, page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const component = await mount(<Switch label="Test Switch" />);
    await component.getByRole('switch').click();

    expect(consoleErrors).toEqual([]);
  });

  // Test generated from MCP click interaction
  test('should toggle checked state when clicked', async ({ mount }) => {
    const InteractiveSwitch = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div>
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            label="Interactive Switch"
          />
          <p>Switch is {checked ? 'ON' : 'OFF'}</p>
        </div>
      );
    };

    const component = await mount(<InteractiveSwitch />);
    const switchButton = component.getByRole('switch');

    // Initial state
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
    await expect(component.getByText('Switch is OFF')).toBeVisible();

    // Click to toggle ON
    await switchButton.click();
    await expect(switchButton).toHaveAttribute('aria-checked', 'true');
    await expect(component.getByText('Switch is ON')).toBeVisible();

    // Click to toggle OFF
    await switchButton.click();
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
    await expect(component.getByText('Switch is OFF')).toBeVisible();
  });

  // Test generated from MCP keyboard navigation
  test('should support keyboard navigation with Space and Enter', async ({
    mount,
    page,
  }) => {
    const InteractiveSwitch = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="Keyboard Switch"
        />
      );
    };

    const component = await mount(<InteractiveSwitch />);
    const switchButton = component.getByRole('switch');

    // Focus the switch
    await switchButton.focus();
    await expect(switchButton).toBeFocused();

    // Press Space to toggle
    await page.keyboard.press('Space');
    await expect(switchButton).toHaveAttribute('aria-checked', 'true');

    // Press Enter to toggle back
    await page.keyboard.press('Enter');
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
  });

  // Test generated from MCP accessibility snapshot
  test('should not have accessibility violations', async ({ mount, page }) => {
    await mount(<Switch checked={false} label="Accessible Switch" />);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should render checked state correctly', async ({ mount }) => {
    const component = await mount(<Switch checked={true} label="Checked" />);
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toHaveAttribute('aria-checked', 'true');
  });

  test('should render unchecked state correctly', async ({ mount }) => {
    const component = await mount(<Switch checked={false} label="Unchecked" />);
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
  });

  // Test generated from MCP disabled state testing
  test('should be disabled when disabled prop is true', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="Disabled Switch" disabled={true} />
    );
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toBeDisabled();
    await expect(switchButton).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not toggle when disabled', async ({ mount }) => {
    const InteractiveSwitch = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label="Disabled"
          disabled={true}
        />
      );
    };

    const component = await mount(<InteractiveSwitch />);
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toHaveAttribute('aria-checked', 'false');

    // Try to click (should not work)
    await switchButton.click({ force: true });

    // Should remain unchecked
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
  });

  test('should render without label', async ({ mount }) => {
    const component = await mount(<Switch checked={false} />);
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toBeVisible();
    await expect(component.getByText('Toggle switch')).not.toBeVisible(); // sr-only text
  });

  test('should render small size variant', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="Small" size="sm" />
    );
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toBeVisible();
    await expect(switchButton).toHaveClass(/h-5/); // Small size class
  });

  test('should render medium size variant', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="Medium" size="md" />
    );
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toBeVisible();
    await expect(switchButton).toHaveClass(/h-6/); // Medium size class
  });

  test('should render large size variant', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="Large" size="lg" />
    );
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toBeVisible();
    await expect(switchButton).toHaveClass(/h-7/); // Large size class
  });

  test('should call onCheckedChange with correct value', async ({ mount }) => {
    let capturedValue: boolean | undefined;

    const component = await mount(
      <Switch
        checked={false}
        onCheckedChange={(checked) => {
          capturedValue = checked;
        }}
        label="Callback Test"
      />
    );

    await component.getByRole('switch').click();

    expect(capturedValue).toBe(true);
  });

  test('should work with form integration', async ({ mount }) => {
    const FormSwitch = () => {
      const [notifications, setNotifications] = useState(true);

      return (
        <form data-testid="test-form">
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            label="Enable notifications"
          />
        </form>
      );
    };

    const component = await mount(<FormSwitch />);
    const switchButton = component.getByRole('switch');

    // Initially checked
    await expect(switchButton).toHaveAttribute('aria-checked', 'true');

    // Toggle off
    await switchButton.click();
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
  });

  test('should have proper ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="ARIA Test" disabled={false} />
    );
    const switchButton = component.getByRole('switch');

    await expect(switchButton).toHaveAttribute('role', 'switch');
    await expect(switchButton).toHaveAttribute('aria-checked', 'false');
    await expect(switchButton).toHaveAttribute('aria-disabled', 'false');
  });

  test('should have visible focus indicator', async ({ mount }) => {
    const component = await mount(
      <Switch checked={false} label="Focus Test" />
    );
    const switchButton = component.getByRole('switch');

    await switchButton.focus();
    await expect(switchButton).toBeFocused();
    await expect(switchButton).toHaveClass(/focus-visible:ring-2/);
  });
});
