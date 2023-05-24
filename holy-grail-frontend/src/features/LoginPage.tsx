import { useState, useContext, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      toast({
        title: "Logged in successfully.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          width="40%"
          mt="-40%"
        >
          <Box textAlign="left" mb="15%">
            <Text fontWeight="bold" fontSize="5xl" mb="5%">
              Log in
            </Text>
            <Text>Enter your credentials to access your account.</Text>
          </Box>
          <Box width="100%">
            <form onSubmit={handleLogin}>
              <VStack spacing="6">
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" w="100%">
                  Log In
                </Button>
              </VStack>
            </form>
            <Text mt="30%">
              Not a member?{" "}
              <Link
                as="button"
                onClick={handleRegister}
                textDecoration="underline"
              >
                Register now.
              </Link>
            </Text>
            {/*<Text>*/}
            {/*  Forgot your password?{" "}*/}
            {/*  <Link as="button" textDecoration="underline">*/}
            {/*    Click here.*/}
            {/*  </Link>*/}
            {/*</Text>*/}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
