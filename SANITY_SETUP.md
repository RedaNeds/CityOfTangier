# Sanity CMS Setup for City of Tangier

This guide will help you set up Sanity CMS for your City of Tangier project.

## Prerequisites

- Node.js installed
- A Sanity account (create one at [sanity.io](https://sanity.io))

## Setup Steps

### 1. Complete Sanity Authentication

The Sanity CLI should have opened a browser window for authentication. Complete the login process.

### 2. Create Your Sanity Project

After authentication, run:

```bash
npx create-sanity@latest --template clean --create-project "City of Tangier" --dataset production
```

This will create a new Sanity project and ask you to:
- Choose a project name
- Select a dataset (use "production")
- Choose a template (use "clean")

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp sanity-env.example .env.local
   ```

2. Edit `.env.local` and add your Sanity project details:
   ```env
   SANITY_PROJECT_ID=your-actual-project-id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   ```

   You can find these values in your Sanity project dashboard.

### 4. Install Sanity Studio Dependencies

```bash
npm install sanity @sanity/vision
```

### 5. Start Sanity Studio

```bash
npm run sanity:dev
```

This will start the Sanity Studio at `http://localhost:3333` where you can:
- Create and edit content
- Upload images
- Manage your content structure

### 6. Deploy Sanity Studio (Optional)

To make your content management accessible from anywhere:

```bash
npm run sanity:deploy
```

This will deploy your Sanity Studio to a public URL.

## Content Types

The following content types are configured:

### Places
- **See & Do**: Museums, beaches, photo spots, nightlife
- **Eat & Drink**: Restaurants, cafes, rooftops, bars
- **Neighborhoods**: Different areas of Tangier

### Events
- Cultural events, music, food & drink, art, sports, festivals

### Itineraries
- Half-day, full-day, weekend, and week-long itineraries
- With difficulty levels and budget categories

### Blog Posts
- Travel tips, culture, food, history, events, local life

### Neighborhoods
- Detailed information about different areas of Tangier

### Partners
- Hotels, restaurants, tour operators, transportation, activity providers

## Migration from Markdown

To migrate your existing markdown content to Sanity:

1. Start the Sanity Studio: `npm run sanity:dev`
2. Create new documents for each content type
3. Copy content from your markdown files
4. Upload images to Sanity
5. Update your Astro pages to use Sanity queries

## Example Usage

### Fetching Places

```typescript
import { client, queries } from '../lib/sanity';

// Get all see-do places
const places = await client.fetch(queries.placesByCategory('see-do'));

// Get a specific place
const place = await client.fetch(queries.placeBySlug('beaches'));
```

### Using Images

```typescript
import { urlFor } from '../lib/sanity';

// Generate image URL
const imageUrl = urlFor(place.featuredImage).width(800).height(600).url();
```

## Benefits of Using Sanity

1. **Visual Content Editor**: Easy-to-use interface for content creators
2. **Image Management**: Built-in image optimization and CDN
3. **Real-time Collaboration**: Multiple editors can work simultaneously
4. **Version Control**: Track changes and revert if needed
5. **API-First**: Access your content from any application
6. **Rich Content**: Support for complex content structures
7. **Localization**: Easy to add multiple languages
8. **Webhooks**: Trigger builds when content changes

## Next Steps

1. Complete the Sanity setup
2. Create your first content in the Sanity Studio
3. Update your Astro pages to fetch from Sanity
4. Test the integration
5. Migrate existing content
6. Deploy and enjoy your new CMS!

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Astro + Sanity Guide](https://docs.astro.build/en/guides/integrations-guide/sanity/)
