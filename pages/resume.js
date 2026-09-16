import {
  Container,
  Heading,
  Box,
  Button,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Layout from "../components/layouts/article";
import { getProfile } from "../lib/sanity";

export async function getStaticProps() {
  const profile = await getProfile();

  return {
    props: {
      pdfUrl: profile?.resumeUrl || "/resume.pdf",
    },
    revalidate: 60,
  };
}

const ResumePage = ({ pdfUrl }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Layout title="Resume">
      <Container maxW="container.md" pt={3}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
          gap={3}
        >
          <Heading as="h3" fontSize={20} mt={0}>
            Resume
          </Heading>

          <Flex gap={3}>
            <Button
              as="a"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              colorScheme="teal"
              size="sm"
              leftIcon={<ExternalLinkIcon />}
            >
              Open PDF
            </Button>
            <Button
              as="a"
              href={pdfUrl}
              download="Abhuday_Mishra_Resume.pdf"
              colorScheme="teal"
              size="sm"
              leftIcon={<DownloadIcon />}
            >
              Download PDF
            </Button>
          </Flex>
        </Flex>

        <Box
          w="100%"
          h={{ base: "600px", md: "850px" }}
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor={borderColor}
          shadow="sm"
        >
          <iframe
            src={pdfUrl}
            title="Resume PDF"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default ResumePage;
