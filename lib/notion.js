import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPublishedBlogs = async () => {
  // Return empty array if not configured to prevent build errors
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.warn("Notion is not configured. Returning empty blogs.");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      // Safely access properties
      const title = page.properties.Title?.title?.[0]?.plain_text || 'Untitled';
      const description = page.properties.Description?.rich_text?.[0]?.plain_text || '';
      const date = page.properties.Date?.date?.start || '';
      const slug = page.properties.Slug?.rich_text?.[0]?.plain_text || page.id;
      
      // Handle different thumbnail formats (internal file or external link)
      let thumbnail = '/images/blogs/blog_01.jpg'; // fallback
      if (page.properties.Thumbnail?.files?.length > 0) {
        const fileObj = page.properties.Thumbnail.files[0];
        thumbnail = fileObj.file?.url || fileObj.external?.url || thumbnail;
      }

      return {
        id: page.id,
        title,
        description,
        date,
        slug,
        thumbnail,
      };
    });
  } catch (error) {
    console.error("Error fetching blogs from Notion:", error);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    return null;
  }

  try {
    // First, find the page with this slug
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const page = response.results[0];
    if (!page) {
      return null;
    }

    // Convert page content to Markdown
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    // Safely extract frontmatter metadata
    const title = page.properties.Title?.title?.[0]?.plain_text || 'Untitled';
    const description = page.properties.Description?.rich_text?.[0]?.plain_text || '';
    const date = page.properties.Date?.date?.start || '';
    
    let image = null;
    if (page.properties.Thumbnail?.files?.length > 0) {
      const fileObj = page.properties.Thumbnail.files[0];
      image = fileObj.file?.url || fileObj.external?.url || image;
    }

    return {
      frontMatter: {
        title,
        description,
        date,
        image,
        slug,
      },
      content: mdString.parent || (typeof mdString === 'string' ? mdString : ""),
    };
  } catch (error) {
    console.error(`Error fetching Notion blog for slug ${slug}:`, error);
    return null;
  }
};
