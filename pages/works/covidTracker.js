import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/work";
import P from "../../components/paragraph";
import Layout from "../../components/layouts/article";

const Work = () => {
  return (
    <Layout title="Covid Tracker">
      <Container>
        <Title>
          Covid Tracker <Badge>2020</Badge>
        </Title>
        <P>
          Coronavirus tracker for each country and each state in India built
          using ReactJS.
        </P>
        <WorkImage src="/images/works/covidTracker_01.jpg" alt="prefab" />

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://abhudaym-covidtracker.netlify.app/">
              https://abhudaym-covidtracker.netlify.app/{" "}
              <ExternalLinkIcon mx="2px" />{" "}
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web Browser</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>ReactJS, MaterialUI</span>
          </ListItem>
          <ListItem>
            <Meta>Repository</Meta>
            <Link href="https://github.com/abhudaym/CovidTracker">
              Covid Tracker <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default Work;
