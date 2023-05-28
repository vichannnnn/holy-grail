import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Flex,
  Image,
} from "@chakra-ui/react";
import FooterLogo from "../../assets/placeholder-footer.svg";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Flex alignItems="start" justify="space-evenly" mt="12%">
      <Flex maxWidth="30%" direction="column" alignItems="flex-start">
        <VStack>
          <Image src={FooterLogo} alt="Placeholder image" mb="10%" />
        </VStack>
        <Box textAlign="left">
          <Text fontSize="sm">
            I honestly don't know what to put here yet.
          </Text>
        </Box>
      </Flex>
      <VStack alignItems="start" spacing={2}>
        <Heading size="sm">Information</Heading>
        <RouterLink to="/#about">About us</RouterLink>
        <RouterLink to="/#features">Features</RouterLink>
        <RouterLink to="/#faq">FAQ</RouterLink>
      </VStack>

      <VStack alignItems="start" spacing={2}>
        <Heading size="sm">My Account</Heading>
        {/*<RouterLink to="/login">Login</RouterLink>*/}
      </VStack>
    </Flex>
  );
};

export default Footer;
