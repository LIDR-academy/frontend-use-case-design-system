import { test, expect } from '@playwright/test';
import { createStorybookHelper } from '../helpers/storybook';

test.describe('Storybook - Atoms', () => {
  test.describe('Button Component', () => {
    test('should render primary button story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--primary');

      const canvas = await storybook.getStoryCanvas();
      const button = canvas.getByRole('button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Primary Button');
    });

    test('should render secondary button story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--secondary');

      const canvas = await storybook.getStoryCanvas();
      const button = canvas.getByRole('button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Secondary Button');
    });

    test('should render disabled button story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--disabled');

      const canvas = await storybook.getStoryCanvas();
      const button = canvas.getByRole('button');

      await expect(button).toBeVisible();
      await expect(button).toBeDisabled();
    });

    test('should be clickable in interactive story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-button--primary');

      const canvas = await storybook.getStoryCanvas();
      const button = canvas.getByRole('button');

      await button.click();
      // Button should be clickable and not throw errors
      await expect(button).toBeVisible();
    });
  });

  test.describe('Input Component', () => {
    test('should render outlined input story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--outlined');

      const canvas = await storybook.getStoryCanvas();
      const input = canvas.getByRole('textbox');

      await expect(input).toBeVisible();
    });

    test('should render filled input', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--filled');

      const canvas = await storybook.getStoryCanvas();
      const input = canvas.getByRole('textbox');

      await expect(input).toBeVisible();
    });

    test('should allow typing in input', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--outlined');

      const canvas = await storybook.getStoryCanvas();
      const input = canvas.getByRole('textbox');

      await input.fill('Test input value');
      await expect(input).toHaveValue('Test input value');
    });

    test('should render error state', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-input--with-error');

      const canvas = await storybook.getStoryCanvas();
      const errorMessage = canvas.getByRole('alert');

      await expect(errorMessage).toBeVisible();
    });
  });

  test.describe('Icon Component', () => {
    test('should render leaf icon story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-icon--leaf');

      const canvas = await storybook.getStoryCanvas();
      const icon = canvas.locator('svg');

      await expect(icon).toBeVisible();
    });

    test('should render different icon sizes', async ({ page }) => {
      const storybook = createStorybookHelper(page);

      // Test small size
      await storybook.navigateToStory('atoms-icon--small');
      let canvas = await storybook.getStoryCanvas();
      let icon = canvas.locator('svg').first();
      await expect(icon).toBeVisible();

      // Test large size
      await storybook.navigateToStory('atoms-icon--large');
      canvas = await storybook.getStoryCanvas();
      icon = canvas.locator('svg').first();
      await expect(icon).toBeVisible();
    });

    test('should render interactive icon', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('atoms-icon--interactive-primary');

      const canvas = await storybook.getStoryCanvas();
      const icon = canvas.locator('svg');

      await expect(icon).toBeVisible();
    });
  });
});

