import { test, expect } from '@playwright/test';
import { createStorybookHelper } from '../helpers/storybook';

test.describe('Storybook - Visual Regression', () => {
  test('should match button variants screenshot', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--primary');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('button-primary.png');
  });

  test('should match button disabled state', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--disabled');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('button-disabled.png');
  });

  test('should match input with label', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-input--with-label');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('input-with-label.png');
  });

  test('should match input error state', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-input--with-error');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('input-error.png');
  });

  test('should match tag component variants', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Blue tag
    await storybook.navigateToStory('molecules-tag--blue');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('tag-blue.png');
    
    // Green tag
    await storybook.navigateToStory('molecules-tag--green');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('tag-green.png');
  });

  test('should match tag sizes', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Small tag
    await storybook.navigateToStory('molecules-tag--small');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('tag-small.png');
    
    // Large tag
    await storybook.navigateToStory('molecules-tag--large');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('tag-large.png');
  });

  test('should match card variants', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Elevated card
    await storybook.navigateToStory('molecules-card--elevated');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('card-elevated.png');
    
    // Outlined card
    await storybook.navigateToStory('molecules-card--outlined');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('card-outlined.png');
    
    // Filled card
    await storybook.navigateToStory('molecules-card--filled');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('card-filled.png');
  });

  test('should match icon sizes', async ({ page }) => {
    const storybook = createStorybookHelper(page);
    
    // Small icon
    await storybook.navigateToStory('atoms-icon--small');
    let canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('icon-small.png');
    
    // Large icon
    await storybook.navigateToStory('atoms-icon--large');
    canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('icon-large.png');
  });
});

test.describe('Storybook - Responsive Design', () => {
  test('should render components correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('atoms-button--primary');

    const canvas = await storybook.getStoryCanvas();
    const button = canvas.getByRole('button');

    await expect(button).toBeVisible();
    await expect(canvas.locator('body')).toHaveScreenshot('button-mobile.png');
  });

  test('should render components correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('molecules-card--with-title');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('card-tablet.png');
  });

  test('should render components correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Full HD

    const storybook = createStorybookHelper(page);
    await storybook.navigateToStory('molecules-tag--default');

    const canvas = await storybook.getStoryCanvas();
    await expect(canvas.locator('body')).toHaveScreenshot('tag-desktop.png');
  });
});

