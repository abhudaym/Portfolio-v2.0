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
              An eCommerce web-application built using MERN Stack.
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="prefabmart"
              title="PrefabMart"
              thumbnail={thumbInkdrop}
            >
              World&apos;s first online Prefabricated structure selling platform
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="linkedhub"
              title="LinkedHub"
              thumbnail={thumbLinkedhub}
            >
              A social networking site for developers created using MERN Stack.
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="covidTracker"
              title="Covid Tracker"
              thumbnail={thumbcovid}
            >
              Coronavirus tracker for each country and each state in India built
              using ReactJS.
            </WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};
export default Works;
