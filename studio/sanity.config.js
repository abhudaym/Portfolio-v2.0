import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

import { markdownSchema } from 'sanity-plugin-markdown'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  projectId: 'xjed1utn',
  dataset: 'production',
  plugins: [structureTool(), markdownSchema()],
  schema: {
    types: schemaTypes,
  },
})
