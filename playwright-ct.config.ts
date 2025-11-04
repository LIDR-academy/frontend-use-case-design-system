import { defineConfig, devices } from '@playwright/experimental-ct-react';

/**
 * Playwright Component Testing Configuration
 * Tests components in isolation with React mounting in a real browser
 */
export default defineConfig({
  testDir: './src',
  testMatch: '**/*.spec.tsx',
  
  /* Maximum time one test can run for */
  timeout: 10 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report/ct' }],
    ['json', { outputFile: 'playwright-report/ct/results.json' }],
    ['list']
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Port to use for the development server */
    ctPort: 3100,

    /* Vite config for component testing */
    ctViteConfig: {
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      css: {
        postcss: './postcss.config.cjs',
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

