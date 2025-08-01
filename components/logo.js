import NextLink from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";

import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`;

const Logo = () => {
  const footPrintImg = `/images/footprint${useColorModeValue("", "-dark")}.png`;
  return (
    <NextLink href="/">
      <LogoBox>
        <Image src={footPrintImg} width={20} height={20}></Image>
        <Text
          color={useColorModeValue("gray:800", "whiteAlpha.900")}
          fontFamily="M PLUS 1c"
          fontWeight="bold"
          ml={1}
        >
          Abhuday Mishra
        </Text>
      </LogoBox>
    </NextLink>
  );
};

export default Logo;
