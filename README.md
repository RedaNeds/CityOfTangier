# City of Tangier

City of Tangier is a tourism website built with [Astro](https://astro.build) and [Sanity](https://sanity.io). It provides pages for events, places, itineraries and guides. Astro renders the frontend while Sanity manages the content.

## Project Setup

### Prerequisites
- Node.js 18+

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment example and fill in your details:
   ```bash
   cp sanity-env.example .env.local
   ```
3. Start the Astro development server:
   ```bash
   npm run dev
   ```
4. (Optional) Start Sanity Studio locally:
   ```bash
   npm run sanity:dev
   ```

## Sanity Integration

Sanity schemas live in the `sanity/` directory and the frontend queries Sanity through `src/lib/sanity.ts`. Use the provided scripts to manage the Studio:

- `npm run sanity:dev` – run Sanity Studio in development mode.
- `npm run sanity:build` – build the Studio for production.
- `npm run sanity:deploy` – deploy the Studio to Sanity hosting.
- `npm run sanity:start` – preview the built Studio locally.

## Environment Variables

Add the following variables to `.env.local`:

| Variable | Description |
| --- | --- |
| `SANITY_PROJECT_ID` | Sanity project ID. |
| `SANITY_DATASET` | Dataset to query (default `production`). |
| `SANITY_API_TOKEN` | Token for read access. |
| `SANITY_WRITE_TOKEN` | Optional token for write operations. |

See `sanity-env.example` for a complete template.

## Development Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start Astro dev server. |
| `npm run build` | Build the site for production. |
| `npm run preview` | Preview the production build. |
| `npm run astro ...` | Run Astro CLI commands. |
| `npm run sanity:dev` | Run Sanity Studio locally. |
| `npm run sanity:build` | Build Sanity Studio. |
| `npm run sanity:deploy` | Deploy Sanity Studio. |
| `npm run sanity:start` | Preview built Studio. |
| `npm run migrate:sanity` | Migrate existing content to Sanity. |
| `npm run migrate:all` | Migrate all local content. |
| `npm run migrate:places` | Migrate places content. |

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes and ensure `npm run build` succeeds.
3. Commit with clear messages and open a pull request.

---
