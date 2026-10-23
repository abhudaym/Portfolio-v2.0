import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// SANITY_OFFLINE=1 skips the network and serves content/blogs/*.md as fixtures (local dev and CI only).
const OFFLINE = process.env.SANITY_OFFLINE === '1';
const localPosts = () => {
  const dir = path.join(process.cwd(), 'content', 'blogs');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    return { _id: f, slug: f.replace(/\.md$/, ''), title: data.title, description: data.description, date: data.date, thumbnail: data.thumbnail, image: data.image, content };
  });
};
const fetchSafe = async (query, params) => {
  if (OFFLINE) {
    if (query.includes('_type == "blog"')) {
      const posts = localPosts();
      return query.includes('[0]') ? posts.find((p) => p.slug === (params || {}).slug) || null : posts;
    }
    return query.includes('[0]') ? null : [];
  }
  return client.fetch(query, params);
};

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
    tags,
    readTime,
    featured,
    badges,
    stats,
    "thumbnail": thumbnail.asset->url
  }`;

  try {
    const blogs = await fetchSafe(query);
    return blogs.map(blog => ({
      id: blog._id,
      title: blog.title || 'Untitled',
      description: blog.description || '',
      date: blog.date || '',
      slug: blog.slug || blog._id,
      tags: blog.tags || [],
      readTime: blog.readTime || null,
      featured: !!blog.featured,
      badges: blog.badges || [],
      stats: blog.stats || [],
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
    tags,
    readTime,
    badges,
    stats,
    content
  }`;

  try {
    const blogData = await fetchSafe(query, { slug });
    
    if (!blogData) return null;

    return {
      frontMatter: {
        title: blogData.title || 'Untitled',
        description: blogData.description || '',
        date: blogData.date || '',
        image: blogData.image || null,
        slug: blogData.slug || slug,
        tags: blogData.tags || [],
        readTime: blogData.readTime || null,
        badges: blogData.badges || [],
        stats: blogData.stats || [],
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
    stack,
    "thumbnail": thumbnail.asset->url
  }`;

  try {
    const works = await fetchSafe(query);
    return works.map(work => ({
      id: work.slug || work._id,
      title: work.title || 'Untitled',
      description: work.description || '',
      date: work.date || '',
      stack: work.stack || '',
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
    const workData = await fetchSafe(query, { slug });
    
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
    about,
    tagline,
    kicker,
    now,
    email,
    typingChallenge,
    bestWpm,
    heroRate,
    heroLines,
    interests,
    socials,
    "resumeUrl": resume.asset->url
  }`;

  try {
    return await fetchSafe(query);
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
    startDate,
    location,
    current,
    highlights
  }`;

  try {
    return await fetchSafe(query);
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
    return await fetchSafe(query);
  } catch (error) {
    console.error("Error fetching skills from Sanity:", error);
    return [];
  }
};

export const getVolunteer = async () => {
  const query = `*[_type == "volunteer"] | order(startDate desc) {
    _id,
    period,
    role,
    org,
    startDate
  }`;

  try {
    return await fetchSafe(query);
  } catch (error) {
    console.error("Error fetching volunteer roles from Sanity:", error);
    return [];
  }
};
