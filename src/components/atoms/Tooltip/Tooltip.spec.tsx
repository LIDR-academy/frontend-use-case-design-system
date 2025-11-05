import { test, expect } from '@playwright/experimental-ct-react';
import { Tooltip } from './Tooltip';
import AxeBuilder from '@axe-core/playwright';

test.describe('Tooltip', () => {
  test.describe('Rendering', () => {
    test('should render trigger element', async ({ mount }) => {
      const component = await mount(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      await expect(
        component.getByRole('button', { name: 'Hover me' })
      ).toBeVisible();
    });

    test('should not show tooltip by default', async ({ mount, page }) => {
      await mount(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).not.toBeVisible();
    });

    test('should render tooltip content', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="This is helpful information">
          <button>Hover me</button>
        </Tooltip>
      );
      await component.hover();
      await page.waitForTimeout(250); // Wait for show delay
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toContainText('This is helpful information');
    });
  });

  test.describe('Positions', () => {
    test('should render tooltip in top position', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Top tooltip" position="top">
          <button>Hover me</button>
        </Tooltip>
      );
      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveClass(/bottom-full/);
    });

    test('should render tooltip in bottom position', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <Tooltip content="Bottom tooltip" position="bottom">
          <button>Hover me</button>
        </Tooltip>
      );
      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveClass(/top-full/);
    });

    test('should render tooltip in left position', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Left tooltip" position="left">
          <button>Hover me</button>
        </Tooltip>
      );
      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveClass(/right-full/);
    });

    test('should render tooltip in right position', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Right tooltip" position="right">
          <button>Hover me</button>
        </Tooltip>
      );
      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveClass(/left-full/);
    });
  });

  test.describe('Interactions', () => {
    test('should show tooltip on mouse hover', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Hover tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      // Initially hidden
      await expect(tooltip).not.toBeVisible();

      // Show on hover
      await component.hover();
      await page.waitForTimeout(250); // Wait for show delay
      await expect(tooltip).toBeVisible();
    });

    test('should hide tooltip on mouse leave', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Leave tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      // Show tooltip
      await component.hover();
      await page.waitForTimeout(250);
      await expect(tooltip).toBeVisible();

      // Hide on leave
      await page.mouse.move(0, 0);
      await page.waitForTimeout(100);
      await expect(tooltip).not.toBeVisible();
    });

    test('should show tooltip on focus', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Focus tooltip">
          <button>Focus me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');
      const button = component.getByRole('button');

      await button.focus();
      await page.waitForTimeout(250);
      await expect(tooltip).toBeVisible();
    });

    test('should hide tooltip on blur', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Blur tooltip">
          <button>Focus me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');
      const button = component.getByRole('button');

      await button.focus();
      await page.waitForTimeout(250);
      await expect(tooltip).toBeVisible();

      await button.blur();
      await page.waitForTimeout(100);
      await expect(tooltip).not.toBeVisible();
    });

    test('should hide tooltip on Escape key', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Escape tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      await component.hover();
      await page.waitForTimeout(250);
      await expect(tooltip).toBeVisible();

      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      await expect(tooltip).not.toBeVisible();
    });
  });

  test.describe('Delays', () => {
    test('should respect custom show delay', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Delayed tooltip" showDelay={500}>
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      await component.hover();

      // Should not be visible before delay
      await page.waitForTimeout(250);
      await expect(tooltip).not.toBeVisible();

      // Should be visible after delay
      await page.waitForTimeout(300);
      await expect(tooltip).toBeVisible();
    });

    test('should respect custom hide delay', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Hide delay tooltip" showDelay={100} hideDelay={300}>
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      await component.hover();
      await page.waitForTimeout(150);
      await expect(tooltip).toBeVisible();

      await page.mouse.move(0, 0);

      // Should still be visible during hide delay
      await page.waitForTimeout(150);
      await expect(tooltip).toBeVisible();

      // Should be hidden after hide delay
      await page.waitForTimeout(200);
      await expect(tooltip).not.toBeVisible();
    });

    test('should use default delays when not specified', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <Tooltip content="Default delays">
          <button>Hover me</button>
        </Tooltip>
      );
      const tooltip = page.getByRole('tooltip');

      await component.hover();

      // Default show delay is 200ms
      await page.waitForTimeout(150);
      await expect(tooltip).not.toBeVisible();

      await page.waitForTimeout(100);
      await expect(tooltip).toBeVisible();
    });
  });

  test.describe('Styling', () => {
    test('should apply custom className', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Custom class" className="custom-tooltip-class">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toHaveClass(/custom-tooltip-class/);
    });

    test('should have correct background color', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Styled tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      const tooltipBox = tooltip.locator('div').first();
      await expect(tooltipBox).toHaveCSS(
        'background-color',
        'rgb(254, 233, 189)'
      ); // #FEE9BD
    });

    test('should have correct text color', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Text color tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      const text = tooltip.locator('p');
      await expect(text).toHaveCSS('color', 'rgb(51, 51, 51)'); // #333333
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA role', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="ARIA tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toHaveAttribute('role', 'tooltip');
    });

    test('should have unique tooltip ID', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="ID tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      const id = await tooltip.getAttribute('id');
      expect(id).toBeTruthy();
      expect(id).toMatch(/^tooltip-/);
    });

    test('should link trigger with aria-describedby', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <Tooltip content="Described by tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = component.getByRole('button');
      await button.hover();
      await page.waitForTimeout(250);

      const describedBy = await button.evaluate((el) =>
        el.parentElement?.getAttribute('aria-describedby')
      );
      expect(describedBy).toBeTruthy();
      expect(describedBy).toMatch(/^tooltip-/);
    });

    test('should not have accessibility violations', async ({
      mount,
      page,
    }) => {
      await mount(
        <Tooltip content="Accessible tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });

    test('should maintain focus on trigger element', async ({
      mount,
      page,
    }) => {
      const component = await mount(
        <Tooltip content="Focus maintained">
          <button>Focus me</button>
        </Tooltip>
      );

      const button = component.getByRole('button');
      await button.focus();
      await page.waitForTimeout(250);

      // Button should still be focused
      await expect(button).toBeFocused();
    });

    test('should be keyboard navigable with Tab', async ({ mount, page }) => {
      await mount(
        <div>
          <button>Before</button>
          <Tooltip content="Tab tooltip">
            <button>Tooltip trigger</button>
          </Tooltip>
          <button>After</button>
        </div>
      );

      // Tab to first button
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Before' })).toBeFocused();

      // Tab to tooltip trigger
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: 'Tooltip trigger' })
      ).toBeFocused();
      await page.waitForTimeout(250);
      await expect(page.getByRole('tooltip')).toBeVisible();

      // Tab to next button
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
      await page.waitForTimeout(100);
      await expect(page.getByRole('tooltip')).not.toBeVisible();
    });
  });

  test.describe('Content Types', () => {
    test('should render string content', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip content="Simple string">
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toContainText('Simple string');
    });

    test('should render JSX content', async ({ mount, page }) => {
      const component = await mount(
        <Tooltip
          content={
            <span>
              JSX <strong>content</strong>
            </span>
          }
        >
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip.locator('strong')).toContainText('content');
    });

    test('should handle long content', async ({ mount, page }) => {
      const longContent =
        'This is a very long tooltip content that might wrap to multiple lines or extend beyond normal boundaries';
      const component = await mount(
        <Tooltip content={longContent}>
          <button>Hover me</button>
        </Tooltip>
      );

      await component.hover();
      await page.waitForTimeout(250);
      const tooltip = page.getByRole('tooltip');
      await expect(tooltip).toContainText(longContent);
    });
  });
});
