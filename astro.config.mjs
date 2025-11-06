// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://cityoftangier.com', // Replace with your actual domain
  integrations: [
    mdx(), 
    tailwind(), 
    sitemap({
      filter: (page) => !page.includes('admin') && !page.includes('api')
    }), 
    react()
  ],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    define: {
      'process.env': process.env
    }
  }
});