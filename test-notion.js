const fs = require('fs');
if (fs.existsSync('.env.local')) {
  fs.readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
    if (line && line.includes('=')) {
      const [key, ...rest] = line.split('=');
      process.env[key] = rest.join('=').replace(/"/g, '').trim();
    }
  });
}

const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function testNotion() {
  console.log("Token:", process.env.NOTION_TOKEN ? "Present" : "Missing");
  console.log("Database ID:", process.env.NOTION_DATABASE_ID);

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    });
    console.log(`Success! Found ${response.results.length} published blogs.`);
  } catch (error) {
    console.error("Error connecting to Notion:");
    console.error(error.message);
  }
}

testNotion();
