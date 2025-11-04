import { test, expect } from '@playwright/test';
import { createStorybookHelper } from '../helpers/storybook';

test.describe('Storybook - Visual Regression', () => {
  test('should match button variants screenshot', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--primary');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('button-primary.png');
  });

  test('should match button disabled state', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--disabled');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('button-disabled.png');
  });

  test('should match input outlined variant', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-input--outlined');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('input-outlined.png');
  });

  test('should match input error state', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-input--with-error');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('input-error.png');
  });

  test('should match tag component types', async ({ page }) => {
    const storybook = createStorybookHelper(page);

    // Positive tag
    await storybook.navigateToStory('molecules-tag--positive');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('tag-positive.png');

    // Negative tag
    await storybook.navigateToStory('molecules-tag--negative');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('tag-negative.png');
  });

  test('should match tag sizes', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Small tag
    await storybook.navigateToStory('molecules-tag--small');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('tag-small.png');
    
    // Large tag
    await storybook.navigateToStory('molecules-tag--large');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('tag-large.png');
  });

  test('should match card variants', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Elevated card
    await storybook.navigateToStory('molecules-card--elevated');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('card-elevated.png');
    
    // Outlined card
    await storybook.navigateToStory('molecules-card--outlined');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('card-outlined.png');
    
    // Filled card
    await storybook.navigateToStory('molecules-card--filled');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('card-filled.png');
  });

  test('should match icon sizes', async ({ page }) => {
    const storybook = createStorybookHelper(page);

    // Extra small icon
    await storybook.navigateToStory('atoms-icon--extra-small');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('icon-extra-small.png');

    // Large icon
    await storybook.navigateToStory('atoms-icon--large');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('icon-large.png');
  });
});

test.describe('Storybook - Responsive Design', () => {
  test('should render button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--primary');

    const canvas = await storybook.getStoryCanvas();
    const button = canvas.getByRole('button');

    await expect(button).toBeVisible();
    await expect(canvas).toHaveScreenshot('button-mobile.png');
  });

  test('should render card on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('molecules-card--with-title');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('card-tablet.png');
  });

  test('should render tag on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Full HD

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('molecules-tag--default');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas).toHaveScreenshot('tag-desktop.png');
  });
});

