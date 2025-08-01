import Logo from "./logo";
import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./theme-toggle-button";
import { AiFillFileText } from "react-icons/ai";

const LinkItem = ({ href, path, children, _target, ...props }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");
  return (
    <Link
      as={NextLink}
      href={href}
      p={2}
      bg={active ? "glassTeal" : undefined}
      color={active ? "#202023" : inactiveColor}
      _target={_target}
      {...props}
    >
      {children}
    </Link>
  );
};

const Navbar = (props) => {
  const { path } = props;
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, nmd: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/blogs" path={path}>
            Blogs
          </LinkItem>
          <LinkItem
            _target="_blank"
            href="https://drive.google.com/file/d/1tZHxfCKrKgjexg7VGR5PoskD18HmSTaF/view?usp=sharing"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <AiFillFileText />
            Resume
          </LinkItem>
        </Stack>
        <Box flex={1} align="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/">
                  <MenuItem>About</MenuItem>
                </NextLink>
                <NextLink href="/works">
                  <MenuItem>Works</MenuItem>
                </NextLink>
                <NextLink href="/blogs">
                  <MenuItem>Blogs</MenuItem>
                </NextLink>
                <MenuItem
                  as={Link}
                  href="https://drive.google.com/file/d/1Ajz1nao8D5Tx3863nkfc6QH2z9Y-bKvW/view?usp=sharing"
                >
                  View Resume
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
