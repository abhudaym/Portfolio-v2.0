import { Heading, SimpleGrid, Text, Box } from "@chakra-ui/react";
import Section from "../components/section";
import { BlogGridItem, GridItemStyle } from "../components/grid-item";
import Layout from "../components/layouts/article";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  const blogsDirectory = path.join(process.cwd(), 'content/blogs');
  
  // Check if directory exists, if not return empty blogs
  if (!fs.existsSync(blogsDirectory)) {
    return { props: { blogs: [] } };
  }
  
  const filenames = fs.readdirSync(blogsDirectory);
  
  const blogs = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      return {
        id: filename.replace('.md', ''),
        title: frontMatter.title || 'Untitled',
        description: frontMatter.description || '',
        thumbnail: frontMatter.thumbnail || '/images/blogs/blog_01.jpg',
        date: frontMatter.date || ''
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

  return { props: { blogs } };
}

const Blogs = ({ blogs }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <Heading as="h3" fontSize={20} mb={4} mt={0}>
        Blogs
      </Heading>

      {blogs.length === 0 ? (
        <Section>
          <Text>No blog posts found. Add some markdown files to the content/blogs directory!</Text>
        </Section>
      ) : (
        <SimpleGrid columns={1} gap={6}>
          {blogs.map((blog) => (
            <Section key={blog.id}>
              <BlogGridItem
                id={blog.id}
                title={blog.title}
                thumbnail={blog.thumbnail}
              >
                <Box>
                  <Text fontSize={14} mb={2}>
                    {blog.description}
                  </Text>
                  {blog.date && (
                    <Text fontSize={12} color="gray.500" fontStyle="italic">
                      Published on {formatDate(blog.date)}
                    </Text>
                  )}
                </Box>
              </BlogGridItem>
            </Section>
          ))}
        </SimpleGrid>
      )}
      <GridItemStyle />
    </Layout>
  );
};

export default Blogs; 