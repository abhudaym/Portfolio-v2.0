export const work = {
  name: 'work',
  title: 'Work',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'E.g., Web, iOS, Android, Windows',
    },
    {
      name: 'stack',
      title: 'Stack',
      type: 'string',
      description: 'E.g., NodeJS, React, MongoDB',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'source',
      title: 'Source Code',
      type: 'url',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'markdown',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
