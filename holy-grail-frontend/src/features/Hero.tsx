import { Box, Flex, Image } from "@chakra-ui/react";
import HeroLogo from "../assets/placeholder-hero.png";
import { HeaderText } from "../components/HeroContent/HeaderText";
import { HeroText } from "../components/HeroContent/HeroText";

const Hero = () => {
  return (
    <Flex
      justifyContent="space-between"
      w="56vw"
      mb="10%"
      minH="40vh"
      bgColor="white"
    >
      <Box w="50%" textAlign="left">
        <HeroText fontWeight="bold" text="Lorem ipsum" mb="3%" lineHeight="1" />
        <HeaderText text="Super fast" />
        <HeaderText text="and secure" />
        <HeaderText text="web hosting" />
        <HeroText
          mt="5%"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu orci
          eget purus convallis fringilla."
        />
        {/* <Button mt="15%" colorScheme="teal">
          Get Started
        </Button> */}
      </Box>
      <Box w="40%">
        <Image src={HeroLogo} alt="Placeholder image" />
      </Box>
    </Flex>
  );
};

export default Hero;
