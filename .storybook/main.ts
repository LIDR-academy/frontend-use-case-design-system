import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/components/atoms/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/molecules/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/organisms/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/templates/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/pages/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Ensure PostCSS is configured properly for Tailwind
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        (await import('tailwindcss')).default,
        (await import('autoprefixer')).default,
      ],
    };
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
