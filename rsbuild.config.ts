import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'FlexJourney',
  },
  source: {
    define: {
      'import.meta.env': JSON.stringify(process.env),
    },
  },
});
