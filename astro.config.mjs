import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://uxbylidiaochoa.com',
  output: 'static',
  build: {
    assets: '_assets',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude redirect stubs and removed pages
        !page.includes('/about-me-page') &&
        !page.includes('/comboard-app') &&
        !page.includes('/offline-budget') &&
        !page.includes('/budgetapp') &&
        !page.includes('/synology-campaign'),
    }),
  ],
});
