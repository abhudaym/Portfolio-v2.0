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

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function createPage() {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: "Building an AI-Powered RCA Analyzer: Transforming Generic Error Messages into Actionable Insights",
              },
            },
          ],
        },
        Slug: {
          rich_text: [
            {
              text: {
                content: "rca_analyzer_blog",
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: "How we leveraged Model Context Protocol (MCP) to build an intelligent system that connects multiple log sources and provides AI-driven root cause analysis - winning 2nd place at our company hackathon.",
              },
            },
          ],
        },
        Date: {
          date: {
            start: "2025-08-01",
          },
        },
        Published: {
          checkbox: true,
        },
      },
    });
    console.log("Success! Page created with ID:", response.id);
  } catch (error) {
    console.error("Error creating page:", error.body ? error.body : error);
  }
}

createPage();
