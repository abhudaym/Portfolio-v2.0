import {
  Container,
  Text,
  Image,
  Box,
  Link,
  Badge,
  List,
  ListItem,
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
import { Title, Meta } from "../../components/work";
import NextLink from "next/link";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPublishedWorks, getWorkBySlug } from '../../lib/sanity';

export async function getStaticPaths() {
  const works = await getPublishedWorks();
  
  const paths = works.map((work) => ({
    params: { id: work.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const workData = await getWorkBySlug(params.id);

  if (!workData) {
    return { notFound: true };
  }

  return {
    props: {
      frontMatter: workData.frontMatter,
      content: workData.content,
      id: params.id,
    },
    revalidate: 10,
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
        <p>
          {frontMatter.description}
        </p>
        <List ml={4} my={4}>
          {frontMatter.website && (
            <ListItem>
              <Meta>Website</Meta>
              <Link href={frontMatter.website} isExternal>
                {frontMatter.website}
              </Link>
            </ListItem>
          )}
          {frontMatter.platform && (
            <ListItem>
              <Meta>Platform</Meta>
              <span>{frontMatter.platform}</span>
            </ListItem>
          )}
          {frontMatter.stack && (
            <ListItem>
              <Meta>Stack</Meta>
              <span>{frontMatter.stack}</span>
            </ListItem>
          )}
          {frontMatter.date && (
            <ListItem>
              <Meta>Date</Meta>
              <span>{formatDate(frontMatter.date)}</span>
            </ListItem>
          )}
          {frontMatter.source && (
            <ListItem>
              <Meta>Source</Meta>
              <Link href={frontMatter.source} isExternal>
                {frontMatter.source}
              </Link>
            </ListItem>
          )}
        </List>

        {frontMatter.date && (
          <Text fontSize="sm" color="gray.500" mb={4} fontStyle="italic">
            Updated on {formatDate(frontMatter.date)}
          </Text>
        )}

        {frontMatter.image && (
          <Box my={6}>
            <Image
              src={frontMatter.image || frontMatter.thumbnail}
              alt={frontMatter.title}
              borderRadius="lg"
              w="full"
              mb={4}
            />
          </Box>
        )}

        <Box className="markdown-content">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
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