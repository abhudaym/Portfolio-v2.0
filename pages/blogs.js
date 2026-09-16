import { Heading, SimpleGrid, Text, Box } from "@chakra-ui/react";
import Section from "../components/section";
import { BlogGridItem, GridItemStyle } from "../components/grid-item";
import Layout from "../components/layouts/article";
import { getPublishedBlogs } from '../lib/sanity';

export async function getStaticProps() {
  const blogs = await getPublishedBlogs();

  return { 
    props: { blogs },
    revalidate: 60 // Revalidate every 60 seconds for ISR
  };
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
                id={blog.slug}
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