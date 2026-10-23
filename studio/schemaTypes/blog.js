export const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'readTime',
      title: 'Read time (minutes)',
      type: 'number',
      description: 'Leave empty to compute automatically from the content',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Shown as the large report at the top of the blogs page',
      initialValue: false,
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      description: 'Small highlighted labels, e.g. "2nd place at the hackathon"',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'kind', type: 'string', title: 'Style', options: { list: ['win', 'ok', 'pink'] } },
          ],
        },
      ],
    },
    {
      name: 'stats',
      title: 'Headline numbers',
      type: 'array',
      description: 'Animated number tiles at the top of the post. Use "Number" for counting up, or "Text" for things like "2nd".',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'to', type: 'number', title: 'Number' },
            { name: 'suf', type: 'string', title: 'Suffix (%, x, k...)' },
            { name: 'text', type: 'string', title: 'Text instead of number' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description:
        'Markdown. To embed an interactive block add a fenced code block whose language is demo and whose only line is the demo name, e.g. a block opened with ```demo containing the single line rca. Available: rca, arch-mcp, pick-source, before-after. For an animated flow diagram use a code block with language flow: one line per row of steps separated by ->, an optional title line above each row, and (notes) after a step.',
    },
  ],
}
