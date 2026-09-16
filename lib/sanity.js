import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xjed1utn',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-08',
  useCdn: false, // Set to false if you want fresh data for ISR
});

export const getPublishedBlogs = async () => {
  // GROQ Query: Fetch all documents of type 'blog' where published is true
  const query = `*[_type == "blog" && published == true] | order(date desc) {
    _id,
    title,
    description,
    date,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`;

  try {
    const blogs = await client.fetch(query);
    return blogs.map(blog => ({
      id: blog._id,
      title: blog.title || 'Untitled',
      description: blog.description || '',
      date: blog.date || '',
      slug: blog.slug || blog._id,
      thumbnail: blog.thumbnail || '/images/blogs/blog_01.jpg',
    }));
  } catch (error) {
    console.error("Error fetching blogs from Sanity:", error);
    return [];
  }
};

export const getBlogBySlug = async (slug) => {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    description,
    date,
    "image": thumbnail.asset->url,
    "slug": slug.current,
    content
  }`;

  try {
    const blogData = await client.fetch(query, { slug });
    
    if (!blogData) return null;

    return {
      frontMatter: {
        title: blogData.title || 'Untitled',
        description: blogData.description || '',
        date: blogData.date || '',
        image: blogData.image || null,
        slug: blogData.slug || slug,
      },
      content: blogData.content || "", 
    };
  } catch (error) {
    console.error(`Error fetching Sanity blog for slug ${slug}:`, error);
    return null;
  }
};

export const getPublishedWorks = async () => {
  const query = `*[_type == "work" && published == true] | order(date desc) {
    _id,
    title,
    description,
    date,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`;

  try {
    const works = await client.fetch(query);
    return works.map(work => ({
      id: work.slug || work._id,
      title: work.title || 'Untitled',
      description: work.description || '',
      date: work.date || '',
      thumbnail: work.thumbnail || '/images/works/prefab_01.jpg',
    }));
  } catch (error) {
    console.error("Error fetching works from Sanity:", error);
    return [];
  }
};

export const getWorkBySlug = async (slug) => {
  const query = `*[_type == "work" && slug.current == $slug][0] {
    title,
    description,
    date,
    platform,
    stack,
    website,
    source,
    "thumbnail": thumbnail.asset->url,
    "slug": slug.current,
    content
  }`;

  try {
    const workData = await client.fetch(query, { slug });
    
    if (!workData) return null;

    return {
      frontMatter: {
        title: workData.title || 'Untitled',
        description: workData.description || '',
        date: workData.date || '',
        platform: workData.platform || '',
        stack: workData.stack || '',
        website: workData.website || '',
        source: workData.source || '',
        thumbnail: workData.thumbnail || null,
        slug: workData.slug || slug,
      },
      content: workData.content || "", 
    };
  } catch (error) {
    console.error(`Error fetching Sanity work for slug ${slug}:`, error);
    return null;
  }
};

export const getProfile = async () => {
  const query = `*[_type == "profile"][0] {
    title,
    about
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching profile from Sanity:", error);
    return null;
  }
};

export const getExperiences = async () => {
  const query = `*[_type == "experience"] | order(startDate desc) {
    _id,
    period,
    role,
    company,
    companyUrl,
    startDate
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching experiences from Sanity:", error);
    return [];
  }
};

export const getSkills = async () => {
  const query = `*[_type == "skill"] | order(order asc) {
    _id,
    name,
    order
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching skills from Sanity:", error);
    return [];
  }
};
