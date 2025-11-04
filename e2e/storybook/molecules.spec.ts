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

    test('should render tag with different colors', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      
      // Test blue tag
      await storybook.navigateToStory('molecules-tag--blue');
      let canvas = await storybook.getStoryCanvas();
      let tag = canvas.locator('div').first();
      await expect(tag).toBeVisible();
      
      // Test green tag
      await storybook.navigateToStory('molecules-tag--green');
      canvas = await storybook.getStoryCanvas();
      tag = canvas.locator('div').first();
      await expect(tag).toBeVisible();
    });

    test('should render tag with different sizes', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      
      // Test small
      await storybook.navigateToStory('molecules-tag--small');
      let canvas = await storybook.getStoryCanvas();
      await expect(canvas.locator('div').first()).toBeVisible();
      
      // Test large
      await storybook.navigateToStory('molecules-tag--large');
      canvas = await storybook.getStoryCanvas();
      await expect(canvas.locator('div').first()).toBeVisible();
    });

    test('should render clickable tag', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--clickable');

      const canvas = await storybook.getStoryCanvas();
      const tag = canvas.getByRole('button');

      await expect(tag).toBeVisible();
      await tag.click();
    });

    test('should render tag without icons', async ({ page }) => {
      const storybook = createStorybookHelper(page);
      await storybook.navigateToStory('molecules-tag--no-icons');

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
      const card = canvas.locator('div').first();

      await expect(card).toBeVisible();
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
      await expect(canvas.locator('div').first()).toBeVisible();
      
      // Test outlined variant
      await storybook.navigateToStory('molecules-card--outlined');
      canvas = await storybook.getStoryCanvas();
      await expect(canvas.locator('div').first()).toBeVisible();
      
      // Test filled variant
      await storybook.navigateToStory('molecules-card--filled');
      canvas = await storybook.getStoryCanvas();
      await expect(canvas.locator('div').first()).toBeVisible();
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

