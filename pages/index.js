import {
  Box,
  Container,
  Heading,
  Image,
  useColorModeValue,
  Button,
  SimpleGrid,
  Link,
  List,
  ListItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Section from "../components/section";
import Paragraph from "../components/paragraph";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../components/layouts/article";
import NextLink from "next/link";
import { BioSection, BioYear } from "../components/bio";
import {
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMusicalNotes,
  IoGuitar,
  IoPiano,
  IoMic,
  IoBook,
  IoBasketball,
  IoCode,
  IoBrush,
  IoLaptop,
} from "react-icons/io5";

export default function Home() {
  return (
    <Layout>
      <Container>
        <Box display={{ md: "flex" }} mt={4}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Abhuday Mishra
            </Heading>
            <p>SDE-2 at AiDash</p>
            <br />

            <Box
              borderRadius="lg"
              bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
              p={3}
              mb={6}
              align="center"
            >
              Get in touch <ChevronRightIcon />{" "}
              <Link href="mailto: abhuday.mishra@hotmail.com">
                abhuday.mishra@hotmail.com
              </Link>
            </Box>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/newdp.jpeg"
              alt="Profile Image"
            />
          </Box>
        </Box>
        <Section delay={0.1}>
          <Heading as="h3" variant={"section-title"}>
            Work
          </Heading>
          <Paragraph>
            Abhuday Mishra (yes, he's referring to himself in the third person, and yes, he knows it's weird) is a software engineer at AiDash, where he spends his days wrangling Java and Spring Boot to build tech that fights climate change. His pride and joy? The Climate Risk Intelligence System (CRIS), a powerhouse of satellite imagery, real-time weather data, and vegetation insights that predict outages before storms and wildfires even think about making landfall.
            <br />
            <br />
            When he's not busy saving the world (or at least trying to), Abhuday can be found either chasing a shuttlecock on the badminton court or shooting some hoops. And if he's not on the court, he's likely plucking away on his guitar, playing piano, or just singing his heart out for no reason at all. Whether it's sports or music, it's his way of staying sane - because, let's be real, talking about yourself in third person can only take you so far.
            <br />
            <br />
            He also writes about technology, software engineering, and his experiences in the industry. From deep dives into frameworks and tools to insights about building scalable systems, his blog posts cover various aspects of modern software development.
          </Paragraph>
          <Box align="center" my={4}>
            <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
              <Link as={NextLink} href="/works">
                <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                  My Portfolio
                </Button>
              </Link>
              <Link as={NextLink} href="/blogs">
                <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                  My Blogs
                </Button>
              </Link>
            </Box>
          </Box>
        </Section>

       <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Experience
        </Heading>
        <BioSection>
          <BioYear>04/2025 - Present</BioYear>
          Software Engineer 2 at{" "}
          <strong>
            <Link href="https://www.aidash.com/climate-risk-intelligence-system/" target="_blank">
              AiDash
            </Link>
          </strong>
        </BioSection>
        <BioSection>
          <BioYear>07/2023 - 03/2025</BioYear>
          Software Engineer 1 at{" "}
          <strong>
            <Link href="https://www.aidash.com/climate-risk-intelligence-system/" target="_blank">
              AiDash
            </Link>
          </strong>
        </BioSection>
        <BioSection>
          <BioYear>11/2022 - 06/2023</BioYear>
          Software Engineer Intern at{" "}
          <strong>
            <Link href="https://www.aidash.com/climate-risk-intelligence-system/" target="_blank">
              AiDash
            </Link>
          </strong>
        </BioSection>
        <BioSection>
          <BioYear>01/2022 - 10/2022</BioYear>
          Software Engineer Intern at{" "}
          <strong>
            <Link href="https://rivi.co" target="_blank">
              Rivi
            </Link>
          </strong>
        </BioSection>
        <BioSection>
          <BioYear>07/2021 - 11/2021</BioYear>
          Software Engineer Intern at{" "}
          <strong>
            <Link href="https://cloud.kreator3d.com/" target="_blank">
              Kreator3D
            </Link>
          </strong>
        </BioSection>
      </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Skills
          </Heading>
          <SimpleGrid columns={2} spacingX={10} spacingY={2}>
            <p>Java</p>
            <p>Python</p>
            <p>C/C++</p>
            <p>JavaScript/TypeScript</p>
            <p>ReactJS</p>
            <p>NextJS</p>
            <p>Spring Boot</p>
            <p>NodeJS/Express</p>
            <p>MongoDB</p>
            <p>PostgreSQL</p>
            <p>AWS</p>
            <p>RabbitMQ</p>
            <p>HTML/CSS</p>
            <p>Git</p>
          </SimpleGrid>
        </Section>

        <Section delay={0.4}>
          <Heading as="h3" variant="section-title">
            Volunteer Experience
          </Heading>
          <BioSection>
            <BioYear>09/2020 - 07/2021</BioYear>
            Associate Technical Lead at <strong>DSC SRM</strong>
          </BioSection>
          <BioSection>
            <BioYear>03/2020 - 03/2021</BioYear>
            Web Developer at <strong>Webarch Club</strong>
          </BioSection>
          <BioSection>
            <BioYear>08/2019 - Present</BioYear>
            Web Developer at <strong>Aakash Research Labs</strong>
          </BioSection>
        </Section>

        <Section delay={0.5}>
          <Heading as="h3" variant="section-title">
            I ❤
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoMusicalNotes} boxSize={6} color="purple.500" mb={2} />
              <Text fontWeight="semibold">Music</Text>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoMic} boxSize={6} color="pink.500" mb={2} />
              <Text fontWeight="semibold">Singing</Text>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoBasketball} boxSize={6} color="red.500" mb={2} />
              <Text fontWeight="semibold">Badminton</Text>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoBasketball} boxSize={6} color="orange.500" mb={2} />
              <Text fontWeight="semibold">Basketball</Text>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoCode} boxSize={6} color="teal.500" mb={2} />
              <Text fontWeight="semibold">Coding</Text>
            </Box>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
              textAlign="center"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            >
              <Icon as={IoLaptop} boxSize={6} color="blue.500" mb={2} />
              <Text fontWeight="semibold">Speed Typing</Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                Best: 130 WPM
              </Text>
            </Box>
          </SimpleGrid>
        </Section>
        <Section delay={0.6}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>

          <List>
            <SimpleGrid columns={2} spacingX={10}>
              <ListItem>
                <Link href="https://github.com/abhudaym" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<Icon as={IoLogoGithub} />}
                  >
                    @abhudaym
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.linkedin.com/in/abhudaym/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<Icon as={IoLogoLinkedin} />}
                  >
                    @abhudaym
                  </Button>
                </Link>
              </ListItem>

              <ListItem>
                <Link
                  href="https://www.instagram.com/abhuday.m/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<Icon as={IoLogoInstagram} />}
                  >
                    @abhuday.m
                  </Button>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="https://twitter.com/MishraAbhuday" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<Icon as={IoLogoTwitter} />}
                  >
                    @MishraAbhuday
                  </Button>
                </Link>
              </ListItem>
            </SimpleGrid>
          </List>
        </Section>
      </Container>
    </Layout>
  );
}
