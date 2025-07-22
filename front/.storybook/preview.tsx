import React from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { theme } from '../src/styles/theme';
import type { Preview } from '@storybook/react-webpack5';

const typedTheme = theme as unknown as Theme;

const withThemeProvider = (Story, context) => (
  <ThemeProvider theme={typedTheme}>
    <Story {...context} />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
