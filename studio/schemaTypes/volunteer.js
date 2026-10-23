export const volunteer = {
  name: 'volunteer',
  title: 'Volunteer Experience',
  type: 'document',
  fields: [
    { name: 'period', title: 'Period', type: 'string', description: 'e.g. "09/2020 - 07/2021"' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'org', title: 'Organisation', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date', description: 'Used for sorting' },
  ],
}
