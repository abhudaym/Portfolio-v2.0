export const profile = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About Me',
      type: 'markdown',
    },
    {
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small line above your name, e.g. "SDE-2 · AiDash"',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      description: 'The sentence under your name in the hero',
    },
    {
      name: 'now',
      title: 'Right now',
      type: 'string',
      description: 'Shown as a small live status line under the tagline, e.g. "building multi-tenant RAG pipelines"',
    },
    { name: 'email', title: 'Email', type: 'string' },
    {
      name: 'typingChallenge',
      title: 'Typing challenge sentence',
      type: 'text',
      rows: 3,
      description: 'Visitors type this in the hero. Every key they press sends a record through the pipeline.',
    },
    { name: 'bestWpm', title: 'Your best WPM', type: 'number', initialValue: 130 },
    {
      name: 'heroRate',
      title: 'Hero counter: records per second',
      type: 'number',
      initialValue: 88.9,
    },
    {
      name: 'heroLines',
      title: 'Hero stat lines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short lines under the counter, e.g. "at 320k+ / hour"',
    },
    {
      name: 'interests',
      title: 'I love...',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'note', type: 'string', title: 'Note' },
          ],
        },
      ],
    },
    {
      name: 'socials',
      title: 'On the web',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'kind', type: 'string', title: 'Kind (code, network, photos, posts...)' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'handle', type: 'string', title: 'Handle' },
            { name: 'href', type: 'url', title: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload your latest resume PDF here',
    },
  ],
}
