import { Box, Flex, Image } from "@chakra-ui/react";
import HeroLogo from "../../assets/placeholder-hero.png";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { HeroBox } from "../../components/HeroBox/HeroBox";

const Hero = () => {
  return (
    <Flex
      display="flex"
      minHeight="30vh"
      mt={["0%", "10%"]}
      mb="10%"
      bgColor="white"
      alignItems="center"
    >
      <HeroBox textAlign="left" w="60%">
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
      <Box w="40%">
        <Image src={HeroLogo} padding="15% 0 15% 15%" alt="" />
      </Box>
    </Flex>
  );
};

export default Hero;
