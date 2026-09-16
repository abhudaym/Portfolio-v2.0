import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xjed1utn',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-08',
  token: process.env.SANITY_API_TOKEN || '', // Wait, do I need a token to write?
});

async function run() {
  await client.patch('7b9129d6-eefc-47e9-85a8-929d1d99b3e7').unset(['content']).commit();
  await client.patch('drafts.7b9129d6-eefc-47e9-85a8-929d1d99b3e7').unset(['content']).commit();
  console.log("Patched!");
}

run().catch(console.error);
