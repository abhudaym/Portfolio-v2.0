import {
  Container,
  Heading,
  Text,
  Image,
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../../components/layouts/article";
import Section from "../../components/section";
import { BlogTitle } from "../../components/work";
import NextLink from "next/link";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPublishedBlogs, getBlogBySlug } from '../../lib/sanity';

export async function getStaticPaths() {
  const blogs = await getPublishedBlogs();
  
  const paths = blogs.map((blog) => ({
    params: { id: blog.slug }
  }));

  // 'blocking' ensures new blog posts generated via ISR render on the server on first request
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const blogData = await getBlogBySlug(params.id);
  
  if (!blogData) {
    return {
      notFound: true
    };
  }
  
  return { 
    props: { 
      frontMatter: blogData.frontMatter,
      content: blogData.content,
      id: params.id
    },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

const Blog = ({ frontMatter, content, id }) => {
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
    <Layout title={frontMatter.title || 'Blog Post'}>
      <Container>
        <BlogTitle>{frontMatter.title}</BlogTitle>
        {frontMatter.description && (
          <Text fontSize="lg" mb={4}>
            {frontMatter.description}
          </Text>
        )}

        {frontMatter.date && (
          <Text fontSize="sm" color="gray.500" mb={4} fontStyle="italic">
            Published on {formatDate(frontMatter.date)}
          </Text>
        )}

        {frontMatter.image && (
          <Box my={6}>
            <Image
              src={frontMatter.image}
              alt={frontMatter.title}
              borderRadius="lg"
              w="full"
              mb={4}
              width={800}
              height={400}
            />
          </Box>
        )}

        <Box className="markdown-content">
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom styling for HTML elements
              video: ({node, ...props}) => (
                <video 
                  {...props} 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '1rem 0'
                  }}
                />
              ),
              iframe: ({node, ...props}) => (
                <iframe 
                  {...props} 
                  style={{
                    maxWidth: '100%',
                    borderRadius: '8px',
                    margin: '1rem 0'
                  }}
                />
              ),
              img: ({node, ...props}) => (
                <img 
                  {...props} 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '1rem 0'
                  }}
                />
              ),
              table: ({ children }) => (
                <TableContainer my={4} border="1px" borderColor="gray.200" borderRadius="md" _dark={{ borderColor: "gray.700" }}>
                  <Table variant="simple" size="sm">
                    {children}
                  </Table>
                </TableContainer>
              ),
              thead: ({ children }) => <Thead>{children}</Thead>,
              tbody: ({ children }) => <Tbody>{children}</Tbody>,
              tr: ({ children }) => <Tr>{children}</Tr>,
              th: ({ children }) => <Th>{children}</Th>,
              td: ({ children }) => <Td>{children}</Td>,
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>

        <Box align="center" my={4}>
          <Link as={NextLink} href="/blogs">
            <Text display="inline-flex" alignItems="center">
              ← Back to Blogs <ChevronRightIcon />
            </Text>
          </Link>
        </Box>
      </Container>
    </Layout>
  );
};

export default Blog; 