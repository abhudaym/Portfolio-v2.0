import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar";
import Head from "next/head";
import Footer from "../footer";

const Main = ({ children, router }) => {
  return (
    <Box 
      as="main" 
      minH="100vh" 
      display="flex" 
      flexDirection="column"
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Abhuday Mishra</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container 
        maxW="container.md" 
        pt={14} 
        pb={8}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Box flex="1">
          {children}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
