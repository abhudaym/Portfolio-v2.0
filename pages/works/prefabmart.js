import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Title, WorkImage, Meta } from "../../components/work";
import P from "../../components/paragraph";
import Layout from "../../components/layouts/article";

const Work = () => {
  return (
    <Layout title="PrefabMart">
      <Container>
        <Title>
          PrefabMart <Badge>2021</Badge>
        </Title>
        <P>
          This website will list down the Prefab/Pod products that are
          serviceable in the user input area and meet buyer demands by providing
          them the required product &amp; services. This website was developed
          as a prototype for Microsoft Developer League 2021.
        </P>
        <WorkImage src="/images/works/prefab_01.jpg" alt="prefab" />
        <WorkImage src="/images/works/prefab_02.jpg" alt="prefab" />
        <WorkImage src="/images/works/prefab_03.jpg" alt="prefab" />
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://prefab-msft.azurewebsites.net/">
              https://prefab-msft.azurewebsites.net/{" "}
              <ExternalLinkIcon mx="2px" />{" "}
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web Browser</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>NodeJS, Express, MongoDB, React, Redux, Microsoft Azure</span>
          </ListItem>
          <ListItem>
            <Meta>Repository</Meta>
            <Link href="https://github.com/abhudaym/Prefab">
              PrefabMart <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default Work;
