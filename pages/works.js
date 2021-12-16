import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import Section from "../components/section";
import { WorkGridItem } from "../components/grid-item";
import thumbInkdrop from "../public/images/works/prefab_01.jpg";
import thumbeproshop from "../public/images/works/eproshop_01.jpg";
import thumbLinkedhub from "../public/images/works/linkedhub_01.jpg";
import thumbcovid from "../public/images/works/covidTracker_01.jpg";
import Layout from "../components/layouts/article";

const Works = () => {
  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4} mt={6}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem
              id="eproshop"
              title="eProShop"
              thumbnail={thumbeproshop}
            >
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="inkdrop"
              title="PrefabMart"
              thumbnail={thumbInkdrop}
            >
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="inkdrop"
              title="LinkedHub"
              thumbnail={thumbLinkedhub}
            >
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="inkdrop"
              title="Covid Tracker"
              thumbnail={thumbcovid}
            >
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};
export default Works;
