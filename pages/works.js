import { Heading, SimpleGrid, Text, Box } from "@chakra-ui/react";
import Section from "../components/section";
import { WorkGridItem, GridItemStyle } from "../components/grid-item";
import thumbInkdrop from "../public/images/works/prefab_01.jpg";
import thumbeproshop from "../public/images/works/eproshop_01.jpg";
import thumbLinkedhub from "../public/images/works/linkedhub_01.jpg";
import thumbcovid from "../public/images/works/covidTracker_01.jpg";
import Layout from "../components/layouts/article";

import { getPublishedWorks } from "../lib/sanity";

export async function getStaticProps() {
  const mdWorks = await getPublishedWorks();

  return {
    props: { mdWorks },
    revalidate: 10,
  };
}

const Works = ({ mdWorks }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <Heading as="h3" fontSize={20} mb={4} mt={0}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        {mdWorks &&
          mdWorks.map((item) => (
            <Section key={item.id}>
              <WorkGridItem id={item.id} title={item.title} thumbnail={item.thumbnail}>
                <Box>
                  <Text fontSize={14}>{item.description}</Text>
                  {item.date && (
                    <Text fontSize={12} color="gray.500" fontStyle="italic" mt={1}>
                      {formatDate(item.date)}
                    </Text>
                  )}
                </Box>
              </WorkGridItem>
            </Section>
          ))}

        <Section>
          <WorkGridItem id="eproshop" title="eProShop" thumbnail={thumbeproshop}>
            An eCommerce web-application built using MERN Stack.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="prefabmart" title="PrefabMart" thumbnail={thumbInkdrop}>
            World&apos;s first online Prefabricated structure selling platform
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="linkedhub" title="LinkedHub" thumbnail={thumbLinkedhub}>
            A social networking site for developers created using MERN Stack.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="covidTracker" title="Covid Tracker" thumbnail={thumbcovid}>
            Coronavirus tracker for each country and each state in India built using ReactJS.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      <GridItemStyle />
    </Layout>
  );
};
export default Works;
