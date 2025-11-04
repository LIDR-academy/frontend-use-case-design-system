import { test, expect } from '@playwright/test';
import { createStorybookHelper } from '../helpers/storybook';

test.describe('Storybook - Molecules', () => {
  test.describe('Tag Component', () => {
    test('should render default tag story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--default');

      const canvas = await storybook.getStoryCanvas();
      const tag = canvas.getByText('Tag');

      await expect(tag).toBeVisible();
    });

    test('should render tag with different types', async ({ page }) => {
      const storybook = createStorybookHelper(page);

      // Test positive tag
      await storybook.navigateToStory('molecules-tag--positive');
      let canvas = await storybook.getStoryCanvas();
      let tag = canvas.getByText('Positivo');
      await expect(tag).toBeVisible();

      // Test negative tag
      await storybook.navigateToStory('molecules-tag--negative');
      canvas = await storybook.getStoryCanvas();
      tag = canvas.getByText('Negativo');
      await expect(tag).toBeVisible();
    });

    test('should render tag with different sizes', async ({ page }) => {
      const storybook = createStorybookHelper(page);

      // Test small
      await storybook.navigateToStory('molecules-tag--small');
      let canvas = await storybook.getStoryCanvas();
      let tag = canvas.getByText('Pequeño');
      await expect(tag).toBeVisible();

      // Test large
      await storybook.navigateToStory('molecules-tag--large');
      canvas = await storybook.getStoryCanvas();
      tag = canvas.getByText('Grande');
      await expect(tag).toBeVisible();
    });

    test('should render tag with icon variations', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--only-start-icon');

      const canvas = await storybook.getStoryCanvas();
      const icons = canvas.locator('svg');

      await expect(icons).toHaveCount(1);
    });

    test('should render tag without icons', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--without-icons');

      const canvas = await storybook.getStoryCanvas();
      const icons = canvas.locator('svg');

      // Should have no icons
      await expect(icons).toHaveCount(0);
    });
  });

  test.describe('Card Component', () => {
    test('should render default card story', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-card--default');

      const canvas = await storybook.getStoryCanvas();
      const cardContent = canvas.getByText(/Esta es una card básica/);

      await expect(cardContent).toBeVisible();
    });

    test('should render card with title', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-card--with-title');

      const canvas = await storybook.getStoryCanvas();
      const heading = canvas.getByRole('heading');

      await expect(heading).toBeVisible();
    });

    test('should render different card variants', async ({ page }) => {
      const storybook = createStorybookHelper(page);

      // Test elevated variant
      await storybook.navigateToStory('molecules-card--elevated');
      let canvas = await storybook.getStoryCanvas();
      let cardContent = canvas.getByText(/Card Elevated/);
      await expect(cardContent).toBeVisible();

      // Test outlined variant
      await storybook.navigateToStory('molecules-card--outlined');
      canvas = await storybook.getStoryCanvas();
      cardContent = canvas.getByText(/Card Outlined/);
      await expect(cardContent).toBeVisible();

      // Test filled variant
      await storybook.navigateToStory('molecules-card--filled');
      canvas = await storybook.getStoryCanvas();
      cardContent = canvas.getByText(/Card Filled/);
      await expect(cardContent).toBeVisible();
    });

    test('should render clickable card', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-card--clickable');

      const canvas = await storybook.getStoryCanvas();
      const card = canvas.getByRole('button');

      await expect(card).toBeVisible();
      await card.click();
    });
  });
});

