import { test, expect } from '@playwright/experimental-ct-react';
import { Checkbox } from './Checkbox';
import AxeBuilder from '@axe-core/playwright';

test.describe('Checkbox', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Checkbox />);
    await expect(component).toBeVisible();
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeVisible();
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms" />);
    await expect(component.getByText('Accept terms')).toBeVisible();
  });

  test('should render in different sizes', async ({ mount }) => {
    const smallCheckbox = await mount(<Checkbox size="sm" label="Small" />);
    await expect(smallCheckbox.locator('input')).toHaveClass(/w-3 h-3/);

    const mediumCheckbox = await mount(<Checkbox size="md" label="Medium" />);
    await expect(mediumCheckbox.locator('input')).toHaveClass(/w-4 h-4/);

    const largeCheckbox = await mount(<Checkbox size="lg" label="Large" />);
    await expect(largeCheckbox.locator('input')).toHaveClass(/w-5 h-5/);
  });

  test('should toggle checked state when clicked', async ({ mount }) => {
    const component = await mount(<Checkbox label="Toggle me" />);

    const input = component.locator('input[type="checkbox"]');
    await expect(input).not.toBeChecked();

    await input.click();
    await expect(input).toBeChecked();
  });

  test('should be checked when defaultChecked is true', async ({ mount }) => {
    const component = await mount(<Checkbox defaultChecked label="Default checked" />);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeChecked();
  });

  test('should handle controlled checked state', async ({ mount }) => {
    const component = await mount(<Checkbox checked={true} onChange={() => {}} label="Controlled" />);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeChecked();
  });

  test('should be disabled when disabled prop is true', async ({ mount }) => {
    const component = await mount(<Checkbox disabled label="Disabled" />);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toBeDisabled();
    await expect(component.locator('label')).toHaveClass(/opacity-50/);
  });

  test('should not toggle when disabled and clicked', async ({ mount }) => {
    const component = await mount(<Checkbox disabled label="Disabled" />);
    const input = component.locator('input[type="checkbox"]');

    await expect(input).not.toBeChecked();
    await input.click({ force: true });
    await expect(input).not.toBeChecked();
  });

  test('should display error message', async ({ mount }) => {
    const component = await mount(
      <Checkbox label="With error" error="This field is required" />
    );
    await expect(component.getByText('This field is required')).toBeVisible();
    await expect(component.getByRole('alert')).toBeVisible();
  });

  test('should display helper text', async ({ mount }) => {
    const component = await mount(
      <Checkbox label="With helper" helperText="Please check this box" />
    );
    await expect(component.getByText('Please check this box')).toBeVisible();
  });

  test('should show required indicator', async ({ mount }) => {
    const component = await mount(<Checkbox label="Required field" required />);
    const input = component.locator('input[type="checkbox"]');
    await expect(input).toHaveAttribute('required');
    await expect(component.getByText('*')).toBeVisible();
  });

  test('should handle keyboard navigation with Space key', async ({ mount, page }) => {
    const component = await mount(<Checkbox label="Keyboard test" />);
    const input = component.locator('input[type="checkbox"]');

    await input.focus();
    await expect(input).toBeFocused();

    await page.keyboard.press('Space');
    await expect(input).toBeChecked();

    await page.keyboard.press('Space');
    await expect(input).not.toBeChecked();
  });

  test('should show focus ring when focused', async ({ mount }) => {
    const component = await mount(<Checkbox label="Focus test" />);
    const input = component.locator('input[type="checkbox"]');

    await input.focus();
    await expect(input).toBeFocused();
    await expect(input).toHaveClass(/focus:ring-2/);
  });

  test('should associate label with input via htmlFor', async ({ mount }) => {
    const component = await mount(<Checkbox label="Associated label" id="test-checkbox" />);
    const input = component.locator('input#test-checkbox');
    const label = component.locator('label[for="test-checkbox"]');

    await expect(input).toBeVisible();
    await expect(label).toBeVisible();
  });

  test('should handle indeterminate state', async ({ mount }) => {
    const component = await mount(<Checkbox indeterminate label="Indeterminate" />);
    const input = component.locator('input[type="checkbox"]');

    // Check indeterminate property via JavaScript evaluation
    const isIndeterminate = await input.evaluate((el: HTMLInputElement) => el.indeterminate);
    expect(isIndeterminate).toBe(true);
  });

  test('should have proper aria attributes', async ({ mount }) => {
    const component = await mount(
      <Checkbox
        label="Aria test"
        error="Error message"
        helperText="Helper text"
      />
    );

    const input = component.locator('input[type="checkbox"]');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('aria-describedby');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(<Checkbox className="custom-class" />);
    await expect(component.locator('.custom-class')).toBeVisible();
  });

  test('should not have accessibility violations', async ({ mount, page }) => {
    await mount(<Checkbox label="Accessibility test" />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations when disabled', async ({ mount, page }) => {
    await mount(<Checkbox label="Disabled accessibility test" disabled />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations with error', async ({ mount, page }) => {
    await mount(<Checkbox label="Error accessibility test" error="Error message" />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations when required', async ({ mount, page }) => {
    await mount(<Checkbox label="Required accessibility test" required />);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
