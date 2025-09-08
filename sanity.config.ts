import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'city-of-tangier',
  title: 'City of Tangier',
  projectId: process.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Places')
              .child(
                S.list()
                  .title('Places')
                  .items([
                    S.listItem()
                      .title('See & Do')
                      .child(
                        S.documentList()
                          .title('See & Do Places')
                          .filter('_type == "place" && category == "see-do"')
                      ),
                    S.listItem()
                      .title('Eat & Drink')
                      .child(
                        S.documentList()
                          .title('Eat & Drink Places')
                          .filter('_type == "place" && category == "eat-drink"')
                      ),
                    S.listItem()
                      .title('All Places')
                      .child(
                        S.documentList()
                          .title('All Places')
                          .filter('_type == "place"')
                      ),
                  ])
              ),
            S.listItem()
              .title('Events')
              .child(
                S.documentList()
                  .title('Events')
                  .filter('_type == "event"')
              ),
            S.listItem()
              .title('Itineraries')
              .child(
                S.documentList()
                  .title('Itineraries')
                  .filter('_type == "itinerary"')
              ),
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .filter('_type == "blogPost"')
              ),
            S.listItem()
              .title('Neighborhoods')
              .child(
                S.documentList()
                  .title('Neighborhoods')
                  .filter('_type == "neighborhood"')
              ),
            S.listItem()
              .title('Partners')
              .child(
                S.documentList()
                  .title('Partners')
                  .filter('_type == "partner"')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

