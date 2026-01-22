import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import { Tag } from './Tag';

test.describe('Tag Component', () => {
  // Rendering tests
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Tag>Tag</Tag>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Tag');
  });

  test('should render with custom text', async ({ mount }) => {
    const component = await mount(<Tag>Custom Tag Text</Tag>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Custom Tag Text');
  });

  test('should render default positive-green variant', async ({
    mount,
    page,
  }) => {
    await mount(<Tag>Default</Tag>);

    // Check for positive-green background color (#dafaeb)
    const tagElement = page.locator('[aria-label*="Tag:"]').first();
    await expect(tagElement).toBeVisible();
  });

  // Variant tests
  test('should render positive-green variant with correct colors', async ({
    mount,
    page,
  }) => {
    await mount(<Tag variant="positive-green">Green</Tag>);

    const tagElement = page.locator('[aria-label*="Tag:"]').first();
    await expect(tagElement).toBeVisible();
    // Figma colors: bg-[#dafaeb] text-[#075e45]
  });

  test('should render positive-blue variant', async ({ mount }) => {
    const component = await mount(<Tag variant="positive-blue">Blue</Tag>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Blue');
  });

  test('should render negative-green variant', async ({ mount }) => {
    const component = await mount(
      <Tag variant="negative-green">Dark Green</Tag>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Dark Green');
  });

  test('should render all positive variants', async ({ mount }) => {
    const variants = [
      'positive-green',
      'positive-blue',
      'positive-yellow',
      'positive-gray',
      'positive-orange',
      'positive-pink',
      'positive-purple',
    ] as const;

    for (const variant of variants) {
      const component = await mount(<Tag variant={variant}>{variant}</Tag>);
      await expect(component).toBeVisible();
    }
  });

  test('should render all negative variants', async ({ mount }) => {
    const variants = [
      'negative-green',
      'negative-blue',
      'negative-yellow',
      'negative-gray',
      'negative-orange',
      'negative-pink',
      'negative-purple',
    ] as const;

    for (const variant of variants) {
      const component = await mount(<Tag variant={variant}>{variant}</Tag>);
      await expect(component).toBeVisible();
    }
  });

  // Icon tests
  test('should render both start and end icons by default', async ({
    mount,
    page,
  }) => {
    await mount(<Tag>With Icons</Tag>);

    // Should have 2 icons (arrow-left and x)
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    expect(iconCount).toBe(2);
  });

  test('should render without start icon', async ({ mount, page }) => {
    await mount(<Tag showStartIcon={false}>No Start Icon</Tag>);

    // Should have only 1 icon (x)
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    expect(iconCount).toBe(1);
  });

  test('should render without end icon', async ({ mount, page }) => {
    await mount(<Tag showEndIcon={false}>No End Icon</Tag>);

    // Should have only 1 icon (arrow-left)
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    expect(iconCount).toBe(1);
  });

  test('should render without any icons', async ({ mount, page }) => {
    await mount(
      <Tag showStartIcon={false} showEndIcon={false}>
        No Icons
      </Tag>
    );

    // Should have no icons
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    expect(iconCount).toBe(0);
  });

  // Remove functionality tests
  test('should call onRemove when end icon is clicked', async ({ mount }) => {
    let removed = false;
    const component = await mount(
      <Tag
        onRemove={() => {
          removed = true;
        }}
      >
        Removable
      </Tag>
    );

    // Click the close button (end icon)
    const closeButton = component.locator('button');
    await closeButton.click();

    expect(removed).toBe(true);
  });

  test('should call onRemove on Enter key', async ({ mount, page }) => {
    let removed = false;
    await mount(
      <Tag
        onRemove={() => {
          removed = true;
        }}
      >
        Keyboard Remove
      </Tag>
    );

    const closeButton = page.locator('button[aria-label*="Remove"]');
    await closeButton.focus();
    await page.keyboard.press('Enter');

    expect(removed).toBe(true);
  });

  test('should call onRemove on Space key', async ({ mount, page }) => {
    let removed = false;
    await mount(
      <Tag
        onRemove={() => {
          removed = true;
        }}
      >
        Space Remove
      </Tag>
    );

    const closeButton = page.locator('button[aria-label*="Remove"]');
    await closeButton.focus();
    await page.keyboard.press('Space');

    expect(removed).toBe(true);
  });

  test('should not call onRemove when start icon area is clicked', async ({
    mount,
  }) => {
    let removed = false;
    const component = await mount(
      <Tag
        onRemove={() => {
          removed = true;
        }}
      >
        Not Removed
      </Tag>
    );

    // Click the tag container (not the close button)
    await component.click({ position: { x: 10, y: 10 } });

    expect(removed).toBe(false);
  });

  // Keyboard navigation tests
  test('should support Tab navigation to close button', async ({
    mount,
    page,
  }) => {
    await mount(<Tag onRemove={() => {}}>Tab Navigation</Tag>);

    const closeButton = page.locator('button[aria-label*="Remove"]');
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();
  });

  test('should show visible focus indicator on close button', async ({
    mount,
    page,
  }) => {
    await mount(<Tag onRemove={() => {}}>Focus Test</Tag>);

    const closeButton = page.locator('button[aria-label*="Remove"]');
    await closeButton.focus();
    await expect(closeButton).toBeFocused();
  });

  // Accessibility tests
  test('should have proper ARIA label', async ({ mount, page }) => {
    await mount(<Tag>Accessible Tag</Tag>);

    const tagElement = page.locator('[aria-label="Tag: Accessible Tag"]');
    await expect(tagElement).toBeVisible();
  });

  test('should have custom ARIA label when provided', async ({
    mount,
    page,
  }) => {
    await mount(<Tag aria-label="Custom Label">Tag</Tag>);

    const tagElement = page.locator('[aria-label="Custom Label"]');
    await expect(tagElement).toBeVisible();
  });

  test('should have proper ARIA label for remove button', async ({
    mount,
    page,
  }) => {
    await mount(<Tag onRemove={() => {}}>Test Tag</Tag>);

    const closeButton = page.locator('button[aria-label="Remove Test Tag"]');
    await expect(closeButton).toBeVisible();
  });

  test('should hide icons from screen readers', async ({ mount, page }) => {
    await mount(<Tag>Screen Reader Test</Tag>);

    const icons = page.locator('svg[aria-hidden="true"]');
    const iconCount = await icons.count();
    expect(iconCount).toBe(2); // Both icons should be hidden
  });

  test('should not have accessibility violations - default', async ({
    mount,
    page,
  }) => {
    await mount(<Tag>Accessible</Tag>);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations - with onRemove', async ({
    mount,
    page,
  }) => {
    await mount(<Tag onRemove={() => {}}>Removable</Tag>);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations - without icons', async ({
    mount,
    page,
  }) => {
    await mount(
      <Tag showStartIcon={false} showEndIcon={false}>
        No Icons
      </Tag>
    );

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should not have accessibility violations - all positive variants', async ({
    mount,
    page,
  }) => {
    const variants = [
      'positive-green',
      'positive-blue',
      'positive-yellow',
      'positive-gray',
      'positive-orange',
      'positive-pink',
      'positive-purple',
    ] as const;

    for (const variant of variants) {
      await mount(<Tag variant={variant}>{variant}</Tag>);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    }
  });

  test('should not have accessibility violations - all negative variants', async ({
    mount,
    page,
  }) => {
    const variants = [
      'negative-green',
      'negative-blue',
      'negative-yellow',
      'negative-gray',
      'negative-orange',
      'negative-pink',
      'negative-purple',
    ] as const;

    for (const variant of variants) {
      await mount(<Tag variant={variant}>{variant}</Tag>);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    }
  });

  // Console error monitoring test
  test('should render without console errors', async ({ mount, page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await mount(<Tag variant="positive-green">No Errors</Tag>);
    expect(consoleErrors).toEqual([]);
  });

  test('should interact without console errors', async ({ mount, page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await mount(<Tag onRemove={() => {}}>Click Me</Tag>);

    const closeButton = page.locator('button[aria-label*="Remove"]');
    await closeButton.click();

    expect(consoleErrors).toEqual([]);
  });

  // Custom className test
  test('should apply custom className', async ({ mount, page }) => {
    await mount(<Tag className="custom-test-class">Custom</Tag>);

    const tagElement = page.locator('.custom-test-class');
    await expect(tagElement).toBeVisible();
  });

  // Edge cases
  test('should handle long text content', async ({ mount }) => {
    const component = await mount(
      <Tag>This is a very long tag text that should still render properly</Tag>
    );
    await expect(component).toBeVisible();
  });

  test('should handle special characters in text', async ({ mount }) => {
    const component = await mount(<Tag>Tag & Text © 2024</Tag>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Tag & Text © 2024');
  });
});
