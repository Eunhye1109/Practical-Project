import React from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { theme } from '../src/styles/theme';
import type { Preview } from '@storybook/react-webpack5';
import type { StoryFn, StoryContext } from '@storybook/react-webpack5';

const typedTheme = theme as unknown as Theme;

const withThemeProvider = (Story: StoryFn, context: StoryContext) => (
  <ThemeProvider theme={typedTheme}>
    {Story(context.args, context)}
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
