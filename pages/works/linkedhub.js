import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/work";
import P from "../../components/paragraph";
import Layout from "../../components/layouts/article";

const Work = () => {
  return (
    <Layout title="LinkedHub">
      <Container>
        <Title>
          LinkedHub <Badge>2020</Badge>
        </Title>
        <P>
          A social networking site for developers created using MERN Stack with
          the functionality of posts, profile, likes and comments. The idea was
          to encorporate github with Stack Overflow where developers can
          communicate.
        </P>
        <WorkImage src="/images/works/linkedhub_04.jpg" alt="covidTracker" />
        <WorkImage src="/images/works/linkedhub_01.jpg" alt="covidTracker" />
        <WorkImage src="/images/works/linkedhub_03.jpg" alt="covidTracker" />
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://linkedhub.herokuapp.com/">
              https://linkedhub.herokuapp.com/ <ExternalLinkIcon mx="2px" />{" "}
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web Browser</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>NodeJS, Express, MongoDB, React</span>
          </ListItem>
          <ListItem>
            <Meta>Repository</Meta>
            <Link href="https://github.com/abhudaym/linkedHub">
              LinkedHub <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default Work;
