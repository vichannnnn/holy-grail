import { Box, Flex, Image } from "@chakra-ui/react";
import AboutLogo from "../../assets/placeholder-about.png";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { HeroBox } from "../../components/HeroBox/HeroBox";

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

        <HeroBox textAlign="right">
          <Title>Super fast and secure web hosting</Title>
          <Text mt="5%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </HeroBox>
      </Flex>
    </div>
  );
};

export default About;
