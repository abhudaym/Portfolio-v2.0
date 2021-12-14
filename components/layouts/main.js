import { Box, Container } from "@chakra-ui/react";
import Navbar from "../navbar";
import Head from "next/head";
import Footer from "../footer";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Abhuday Mishra</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
