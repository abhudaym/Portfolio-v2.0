export const experience = {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. "04/2025 - Present" or "07/2023 - 03/2025"',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Software Engineer 2"',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'e.g. "AiDash"',
    },
    {
      name: 'companyUrl',
      title: 'Company URL',
      type: 'url',
      description: 'Link to company website',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Used for sorting experiences chronologically',
    },
  ],
}
