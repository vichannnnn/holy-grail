import { Box, Flex, Image } from "@chakra-ui/react";
import HeroLogo from "../../assets/placeholder-hero.png";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { HeroBox } from "../../components/HeroBox/HeroBox";

const Hero = () => {
  return (
    <Flex justifyContent="space-between" mb="10%" minH="40vh" bgColor="white">
      <HeroBox textAlign="left">
        <Title mb="3%" lineHeight="1">
          Super fast and secure web hosting
        </Title>
        <Text mt="5%">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu orci
          eget purus convallis fringilla.
        </Text>
        {/* <Button mt="15%" colorScheme="teal">
          Get Started
        </Button> */}
      </HeroBox>
      <Box w="40%">
        <Image src={HeroLogo} alt="Placeholder image" />
      </Box>
    </Flex>
  );
};

export default Hero;
