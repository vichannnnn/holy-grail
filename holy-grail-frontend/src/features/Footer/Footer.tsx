import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Flex,
  Image,
} from "@chakra-ui/react";
import GrailLogo from "../../assets/holy-grail.svg";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <div align="center">
      <Image src={GrailLogo} alt="" mb="3%" mt="3%" w={["15%", "5%"]} />
      <Flex justifyContent="space-between" alignItems="start" maxWidth="80%">
        <VStack alignItems="start" spacing={2} ml="auto" mr="auto" mb="3%">
          <Heading size={["sm", "md"]}>Information</Heading>
          <RouterLink to="/#about">
            <Text fontSize={["12px", "15px"]}>About us</Text>
          </RouterLink>
          <RouterLink to="/#features">
            <Text fontSize={["12px", "15px"]}>Features</Text>
          </RouterLink>
          <RouterLink to="/#faq">
            <Text fontSize={["12px", "15px"]}>FAQ</Text>
          </RouterLink>
        </VStack>

        <VStack alignItems="start" spacing={2} ml="auto" mr="auto">
          <Heading size="sm">My Account</Heading>
          {/*<RouterLink to="/login">Login</RouterLink>*/}
        </VStack>
      </Flex>
    </div>
  );
};

export default Footer;
