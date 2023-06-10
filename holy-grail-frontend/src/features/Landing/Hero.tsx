import { Box, Flex, Image } from "@chakra-ui/react";
import HeroLogo from "../../assets/placeholder-hero.png";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { HeroBox } from "../../components/HeroBox/HeroBox";

const Hero = () => {
  return (
    <Flex
      display={["column", "flex"]}
      minHeight={["40vh", "60vh"]}
      mt={["0%", "auto"]}
      mb="auto"
      bgColor="white"
      alignItems="center"
      padding="0 20%"
    >
      <Box w="50%" mt="10%" ml="auto" mr="auto" display={["flex", "none"]}>
        <Image src={HeroLogo} padding="15% 0 15% 15%" alt="" />
      </Box>
      <HeroBox textAlign={["center", "left"]} w={["100%", "60%"]}>
        <Title mb="3%" lineHeight="1">
          A central repository for your notes
        </Title>
        <Text mt="5%">
          Every resource you need for your studies consolidated in a library.
        </Text>
        {/* <Button mt="15%" colorScheme="teal">
          Get Started
        </Button> */}
      </HeroBox>
      <Box w="30%" ml="auto" display={["none", "flex"]}>
        <Image src={HeroLogo} padding="15% 0 15% 15%" alt="" />
      </Box>
    </Flex>
  );
};

export default Hero;
