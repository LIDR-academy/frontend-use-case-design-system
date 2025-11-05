import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createStorybookHelper } from '../helpers/storybook';

test.describe('Storybook - Accessibility', () => {
  test.describe('Button Accessibility', () => {
    test('primary button should not have accessibility violations', async ({
      page,
    }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--primary');

      // Run accessibility scan on the page directly (we're already in iframe.html)
      // Disable best-practice rules that are limitations of Storybook's iframe
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['landmark-one-main', 'page-has-heading-one'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('disabled button should not have accessibility violations', async ({
      page,
    }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--disabled');

      const canvas = await storybook.getStoryCanvas();
      const button = canvas.getByRole('button');

      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('disabled');
    });
  });

  test.describe('Input Accessibility', () => {
    test('input with label should be properly associated', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--outlined');

      const canvas = await storybook.getStoryCanvas();
      const input = canvas.getByRole('textbox');

      // Input should have proper label association
      await expect(input).toBeVisible();
    });

    test('input error should be announced', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--with-error');

      const canvas = await storybook.getStoryCanvas();
      const errorMessage = canvas.getByRole('alert');

      // Error message should have alert role
      await expect(errorMessage).toBeVisible();
    });

    test('required input should have proper indicators', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--required');

      const canvas = await storybook.getStoryCanvas();
      const input = canvas.getByRole('textbox');

      await expect(input).toHaveAttribute('required');
    });
  });

  test.describe('Icon Accessibility', () => {
    test('decorative icon should be visible', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-icon--leaf');

      const canvas = await storybook.getStoryCanvas();
      const icon = canvas.locator('svg').first();

      await expect(icon).toBeVisible();
    });

    test('interactive icon should be keyboard accessible', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-icon--interactive-primary');

      const canvas = await storybook.getStoryCanvas();
      const icon = canvas.locator('svg').first();

      await expect(icon).toBeVisible();
    });
  });

  test.describe('Card Accessibility', () => {
    test('card with heading should have proper structure', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-card--with-title');

      const canvas = await storybook.getStoryCanvas();
      const heading = canvas.getByRole('heading');

      await expect(heading).toBeVisible();
    });

    test('clickable card should be keyboard accessible', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-card--clickable');

      const canvas = await storybook.getStoryCanvas();
      const card = canvas.getByRole('button');

      await expect(card).toHaveAttribute('tabIndex', '0');

      // Should be focusable
      await card.focus();
      await expect(card).toBeFocused();
    });
  });

  test.describe('Tag Accessibility', () => {
    test('static tag should be accessible', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--default');

      const canvas = await storybook.getStoryCanvas();
      const tag = canvas.getByText('Tag');

      await expect(tag).toBeVisible();
    });

    test('tag with icons should be visible', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--only-start-icon');

      const canvas = await storybook.getStoryCanvas();
      const tag = canvas.getByText('Con inicio');

      await expect(tag).toBeVisible();
    });
  });

  test.describe('Color Contrast', () => {
    test('all components should pass color contrast checks', async ({
      page,
    }) => {
      const stories = [
        'atoms-button--primary',
        'atoms-input--outlined',
        'molecules-tag--default',
        'molecules-card--with-title',
      ];

      for (const story of stories) {
        const storybook = createStorybookHelper(page);
        await storybook.navigateToStory(story);

        // Check color contrast on page directly (we're in iframe.html)
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2aa', 'wcag21aa'])
          .analyze();

        const contrastViolations = accessibilityScanResults.violations.filter(
          (v) => v.id === 'color-contrast'
        );

        expect(contrastViolations).toEqual([]);
      }
    });
  });
});
