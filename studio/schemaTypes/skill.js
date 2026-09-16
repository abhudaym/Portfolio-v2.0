export const skill = {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used for sorting skills manually (lower numbers first)',
    },
  ],
}
