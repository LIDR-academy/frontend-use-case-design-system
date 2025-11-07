import { test, expect } from '@playwright/experimental-ct-react';
import { AxeBuilder } from '@axe-core/playwright';
import { Checkbox } from './Checkbox';

test.describe('Checkbox', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Checkbox />);
    await expect(component).toBeVisible();
    await expect(component.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms" />);
    await expect(component.locator('label')).toBeVisible();
    await expect(component.locator('label')).toHaveText('Accept terms');
  });

  test('should be unchecked by default', async ({ mount }) => {
    const component = await mount(<Checkbox />);
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).not.toBeChecked();
  });

  test('should render in checked state', async ({ mount }) => {
    const component = await mount(<Checkbox checked />);
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('should toggle checked state on click', async ({ mount }) => {
    const component = await mount(<Checkbox />);
    const checkbox = component.locator('input[type="checkbox"]');

    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('should handle disabled state', async ({ mount }) => {
    const component = await mount(<Checkbox disabled />);
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeDisabled();
  });

  test('should not be clickable when disabled', async ({ mount }) => {
    const component = await mount(<Checkbox checked disabled />);
    const checkbox = component.locator('input[type="checkbox"]');

    await expect(checkbox).toBeChecked();
    await checkbox.click({ force: true });
    await expect(checkbox).toBeChecked(); // Should remain checked
  });

  test('should display error message', async ({ mount }) => {
    const errorMessage = 'This field is required';
    const component = await mount(<Checkbox error={errorMessage} />);
    const error = component.locator('[role="alert"]');

    await expect(error).toBeVisible();
    await expect(error).toHaveText(errorMessage);
  });

  test('should display helper text', async ({ mount }) => {
    const helperText = 'Check this option to continue';
    const component = await mount(<Checkbox helperText={helperText} />);
    const helper = component.getByText(helperText);

    await expect(helper).toBeVisible();
  });

  test('should not show helper text when error is present', async ({
    mount,
  }) => {
    const component = await mount(
      <Checkbox
        error="Error message"
        helperText="Helper text should not show"
      />
    );

    const error = component.locator('[role="alert"]');
    const helper = component.getByText('Helper text should not show');

    await expect(error).toBeVisible();
    await expect(helper).not.toBeVisible();
  });

  test('should support keyboard navigation with Tab', async ({
    mount,
    page,
  }) => {
    const component = await mount(<Checkbox label="Keyboard test" />);
    const checkbox = component.locator('input[type="checkbox"]');

    await page.keyboard.press('Tab');
    await expect(checkbox).toBeFocused();
  });

  test('should support keyboard activation with Space', async ({
    mount,
    page,
  }) => {
    const component = await mount(<Checkbox label="Keyboard test" />);
    const checkbox = component.locator('input[type="checkbox"]');

    await page.keyboard.press('Tab');
    await expect(checkbox).toBeFocused();

    await expect(checkbox).not.toBeChecked();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();

    await page.keyboard.press('Space');
    await expect(checkbox).not.toBeChecked();
  });

  test('should handle indeterminate state', async ({ mount }) => {
    const component = await mount(<Checkbox indeterminate />);
    const checkbox = component.locator('input[type="checkbox"]');

    // Playwright doesn't have a direct way to check indeterminate,
    // so we verify it's set via JavaScript
    const isIndeterminate = await checkbox.evaluate(
      (el: HTMLInputElement) => el.indeterminate
    );
    expect(isIndeterminate).toBe(true);
  });

  test('should have proper ARIA attributes with error', async ({ mount }) => {
    const component = await mount(<Checkbox error="Required field" />);
    const checkbox = component.locator('input[type="checkbox"]');

    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    await expect(checkbox).toHaveAttribute('aria-describedby');
  });

  test('should have proper ARIA attributes with helper text', async ({
    mount,
  }) => {
    const component = await mount(<Checkbox helperText="Some helper text" />);
    const checkbox = component.locator('input[type="checkbox"]');

    await expect(checkbox).toHaveAttribute('aria-describedby');
  });

  test('should work without console errors', async ({ mount, page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const component = await mount(<Checkbox label="Console test" />);
    const checkbox = component.locator('input[type="checkbox"]');

    await checkbox.click();
    await checkbox.click();

    expect(consoleErrors).toEqual([]);
  });

  test('should not have accessibility violations', async ({ mount, page }) => {
    await mount(<Checkbox label="Accessible checkbox" />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations when checked', async ({
    mount,
    page,
  }) => {
    await mount(<Checkbox label="Checked checkbox" checked />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations when disabled', async ({
    mount,
    page,
  }) => {
    await mount(<Checkbox label="Disabled checkbox" disabled />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations with error', async ({
    mount,
    page,
  }) => {
    await mount(<Checkbox label="Error checkbox" error="This is required" />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations without label but with aria-label', async ({
    mount,
    page,
  }) => {
    await mount(<Checkbox aria-label="Checkbox without visible label" />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
