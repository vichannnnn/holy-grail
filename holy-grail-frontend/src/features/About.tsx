import { Box, Flex, Image } from "@chakra-ui/react";
import AboutLogo from "../assets/placeholder-about.png";
import { HeaderText } from "../components/HeroContent/HeaderText";
import { HeroText } from "../components/HeroContent/HeroText";

const About = () => {
  return (
    <div id="about">
      <Flex
        justifyContent="space-between"
        w="100%"
        mb="10%"
        minH="40vh"
        bgColor="white"
        mt="10%"
      >
        <Box w="40%">
          <Image src={AboutLogo} alt="Placeholder image" />
        </Box>

        <Box w="50%" textAlign="right">
          <HeroText
            fontWeight="bold"
            text="Lorem ipsum"
            mb="3%"
            lineHeight="1"
          />
          <HeaderText text="Super fast" />
          <HeaderText text="and secure" />
          <HeaderText text="web hosting" />
          <HeroText
            mt="5%"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          />
        </Box>
      </Flex>
    </div>
  );
};

export default About;
