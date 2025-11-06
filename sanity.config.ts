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
                      .title('Attractions')
                      .child(
                        S.documentList()
                          .title('Attractions')
                          .filter('_type == "place" && (category == "attractions" || category == "See & Do")')
                      ),
                    S.listItem()
                      .title('Restaurants & Cafes')
                      .child(
                        S.documentList()
                          .title('Restaurants & Cafes')
                          .filter('_type == "place" && (category == "restaurants" || category == "Eat & Drink")')
                      ),
                    S.listItem()
                      .title('Accommodation')
                      .child(
                        S.documentList()
                          .title('Accommodation')
                          .filter('_type == "place" && category == "accommodation"')
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

