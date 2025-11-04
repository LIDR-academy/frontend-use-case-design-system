import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

// Importar estilos globales
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Configuración para dark mode
    darkMode: {
      // Dark theme configuration
      dark: {
        ...themes.dark,
        appBg: 'var(--color-background)',
        appContentBg: 'var(--color-card)',
        barBg: 'var(--color-card)',
      },
      // Light theme configuration
      light: {
        ...themes.normal,
        appBg: 'var(--color-background)',
        appContentBg: 'var(--color-card)',
        barBg: 'var(--color-card)',
      },
      // Start with light mode
      current: 'light',
      // Apply dark class to html element
      classTarget: 'html',
      // Apply styles to preview iframe
      stylePreview: true,
    },
    // Remove old background config since we're using dark mode addon
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'heading-order',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
