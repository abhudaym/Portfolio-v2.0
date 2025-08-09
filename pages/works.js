import { Heading, SimpleGrid } from "@chakra-ui/react";
import Section from "../components/section";
import { WorkGridItem, GridItemStyle } from "../components/grid-item";
import thumbInkdrop from "../public/images/works/prefab_01.jpg";
import thumbeproshop from "../public/images/works/eproshop_01.jpg";
import thumbLinkedhub from "../public/images/works/linkedhub_01.jpg";
import thumbcovid from "../public/images/works/covidTracker_01.jpg";
import Layout from "../components/layouts/article";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticProps() {
  const worksDirectory = path.join(process.cwd(), "content/works");

  let mdWorks = [];

  if (fs.existsSync(worksDirectory)) {
    const filenames = fs
      .readdirSync(worksDirectory)
      .filter((filename) => filename.endsWith(".md"));

    mdWorks = filenames
      .map((filename) => {
        const filePath = path.join(worksDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data: frontMatter } = matter(fileContents);

        return {
          id: filename.replace(".md", ""),
          title: frontMatter.title || "Untitled",
          description: frontMatter.description || "",
          thumbnail: frontMatter.thumbnail || "/images/works/prefab_01.jpg",
          date: frontMatter.date || "",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return {
    props: { mdWorks },
  };
}

const Works = ({ mdWorks }) => {
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
                {item.description}
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
