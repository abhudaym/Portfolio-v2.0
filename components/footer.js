import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      Developed by{" "}
      <Link href="https://www.linkedin.com/in/abhudaym" target="_blank">
        Abhuday Mishra
      </Link>{" "}
      &copy; {new Date().getFullYear()}
    </Box>
  );
};

export default Footer;
