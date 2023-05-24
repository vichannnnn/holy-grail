import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Flex,
  Image,
} from "@chakra-ui/react";
import FooterLogo from "../assets/placeholder-footer.svg";

const Footer = () => {
  return (
    <Flex alignItems="start" justify="space-evenly" mt="12%">
      <Flex maxWidth="30%" direction="column" alignItems="flex-start">
        <VStack>
          <Image src={FooterLogo} alt="Placeholder image" mb="10%" />
        </VStack>
        <Box textAlign="left">
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dui
            mauris, volutpat nec dolor et, suscipit lacinia lectus.
          </Text>
        </Box>
      </Flex>
      <VStack alignItems="start" spacing={2}>
        <Heading size="sm">Information</Heading>
        <Link href="#">About us</Link>
        <Link href="#">Features</Link>
        <Link href="#">FAQ</Link>
      </VStack>

      <VStack alignItems="start" spacing={2}>
        <Heading size="sm">My Account</Heading>
        <Link href="#">Login</Link>
      </VStack>
    </Flex>
  );
};

export default Footer;
