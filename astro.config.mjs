import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://uxbylidiaochoa.com',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
