import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/work";
import P from "../../components/paragraph";
import Layout from "../../components/layouts/article";

const Work = () => {
  return (
    <Layout title="Inkdrop">
      <Container>
        <Title>
          eProShop <Badge>2021</Badge>
        </Title>
        <P>
          A Markdown note-taking app with 100+ plugins, cross-platform and
          sometihng someting something.
        </P>
        <WorkImage src="/images/works/eproshop_02.jpg" alt="Inkdrop" />
        <WorkImage src="/images/works/eproshop_01.jpg" alt="Inkdrop" />
        <WorkImage src="/images/works/eproshop_03.jpg" alt="Inkdrop" />
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://www.inkdrop.app/">
              https://www.inkdrop.app/ <ExternalLinkIcon mx="2px" />{" "}
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web Browser</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>MongoDB, Express, React, NodeJS, Redux, MaterialUI</span>
          </ListItem>
          <ListItem>
            <Meta>Repository</Meta>
            <Link href="https://github.com/abhudaym/eproshop">
              eProshop - a full-fledged eCommerce website{" "}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default Work;
