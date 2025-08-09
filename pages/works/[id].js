import fs from 'fs';
import path from 'path';
import { Container, Text, Image, Box, Link } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../../components/layouts/article";
import { Title } from "../../components/work";
import NextLink from "next/link";
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';

export async function getStaticPaths() {
  const worksDirectory = path.join(process.cwd(), 'content/works');

  if (!fs.existsSync(worksDirectory)) {
    return { paths: [], fallback: false };
  }

  const filenames = fs.readdirSync(worksDirectory);

  const paths = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => ({ params: { id: filename.replace('.md', '') } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/works', `${params.id}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      frontMatter,
      content,
      id: params.id,
    },
  };
}

const WorkMarkdownPage = ({ frontMatter, content }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout title={frontMatter.title || 'Work'}>
      <Container>
        <Title>{frontMatter.title}</Title>

        {frontMatter.description && (
          <Text fontSize="lg" mb={4}>
            {frontMatter.description}
          </Text>
        )}

        {frontMatter.date && (
          <Text fontSize="sm" color="gray.500" mb={4} fontStyle="italic">
            Updated on {formatDate(frontMatter.date)}
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
            components={{
              video: ({ node, ...props }) => (
                <video
                  {...props}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '1rem 0',
                  }}
                  onLoadedMetadata={(e) => {
                    e.target.playbackRate = 2.0;
                  }}
                />
              ),
              iframe: ({ node, ...props }) => (
                <iframe
                  {...props}
                  style={{
                    maxWidth: '100%',
                    borderRadius: '8px',
                    margin: '1rem 0',
                  }}
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '1rem 0',
                  }}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>

        <Box align="center" my={4}>
          <Link as={NextLink} href="/works">
            <Text display="inline-flex" alignItems="center">
              ← Back to Works <ChevronRightIcon />
            </Text>
          </Link>
        </Box>
      </Container>
    </Layout>
  );
};

export default WorkMarkdownPage;