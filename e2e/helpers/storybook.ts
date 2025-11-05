import { Page } from '@playwright/test';

/**
 * Helper functions for navigating and interacting with Storybook
 */

export class StorybookHelper {
  constructor(private page: Page) {}

  /**
   * Navigate to a specific story
   * @param storyPath - Path in format "atoms-button--primary"
   */
  async navigateToStory(storyPath: string): Promise<void> {
    await this.page.goto(`/iframe.html?id=${storyPath}&viewMode=story`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the story canvas (iframe content)
   * When navigating to /iframe.html, we're already in the iframe content,
   * so we return the page locator directly
   */
  async getStoryCanvas() {
    // Since we navigate directly to iframe.html, we're already in the story canvas
    // No need to look for an iframe within the page
    return this.page.locator('body');
  }

  /**
   * Wait for story to be fully loaded
   */
  async waitForStoryLoaded(): Promise<void> {
    await this.page.waitForSelector('#storybook-preview-iframe', {
      state: 'attached',
    });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get a control input by label
   */
  async getControl(label: string) {
    return this.page.getByLabel(label);
  }

  /**
   * Set a text control value
   */
  async setTextControl(label: string, value: string): Promise<void> {
    const control = await this.getControl(label);
    await control.fill(value);
  }

  /**
   * Click a boolean control
   */
  async toggleBooleanControl(label: string): Promise<void> {
    const control = await this.getControl(label);
    await control.click();
  }

  /**
   * Select an option from a select control
   */
  async selectControl(label: string, value: string): Promise<void> {
    const control = await this.getControl(label);
    await control.selectOption(value);
  }

  /**
   * Take a screenshot of the current story
   */
  async screenshotStory(name: string): Promise<void> {
    const canvas = await this.getStoryCanvas();
    await canvas
      .locator('body')
      .screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Navigate to the docs page for a story
   */
  async navigateToDocs(storyPath: string): Promise<void> {
    await this.page.goto(`/?path=/docs/${storyPath}`);
    await this.page.waitForLoadState('networkidle');
  }
}

/**
 * Create a Storybook helper instance
 */
export function createStorybookHelper(page: Page): StorybookHelper {
  return new StorybookHelper(page);
}
