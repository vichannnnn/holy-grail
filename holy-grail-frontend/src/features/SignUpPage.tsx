import React, { useState, useEffect } from "react";
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
import apiClient from "../api/apiClient";
import { AxiosError } from "axios";
import PasswordValidationBox from "./PasswordValidationBox";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const [lengthValid, setLengthValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [capitalLetterValid, setCapitalLetterValid] = useState(false);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
  const allCriteriaMet =
    lengthValid &&
    specialCharValid &&
    capitalLetterValid &&
    repeatPasswordValid;

  useEffect(() => {
    setLengthValid(password.length <= 30 && password.length >= 8);
    setSpecialCharValid(/[!@#$%^&*]/.test(password));
    setCapitalLetterValid(/[A-Z]/.test(password));
    setRepeatPasswordValid(password === repeatPassword && password !== "");
  }, [password, repeatPassword]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiClient.post("/auth/create", {
        username: username,
        password: password,
        repeat_password: repeatPassword,
        email: email,
      });

      toast({
        title: "Account successfully created.",
        description: `Please check your email (${email}) for the verification link.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      let errorDescription =
        "Unable to create account. Please check your input and try again.";
      const axiosError = error as AxiosError<ErrorResponseData>;

      type ErrorResponseData = {
        detail: string;
      };

      if (axiosError.response && axiosError.response.status === 409) {
        if (axiosError.response.data.detail === "Email already exists") {
          errorDescription = "An account with this email already exists.";
        } else if (
          axiosError.response.data.detail === "Username already exists"
        ) {
          errorDescription = "An account with this username already exists.";
        }
      } else if (axiosError.response && axiosError.response.status === 400) {
        errorDescription =
          "Your password does not match. Please check your password and try again.";
      }

      toast({
        title: "Registration failed.",
        description: errorDescription,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
              Sign Up
            </Text>
            <Text>Create an account to access all features.</Text>
          </Box>
          <Box width="100%">
            <form onSubmit={handleRegister}>
              <VStack spacing="6">
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <FormControl id="repeat-password">
                  <FormLabel>Repeat Password</FormLabel>
                  <Input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </FormControl>

                <PasswordValidationBox
                  lengthValid={lengthValid}
                  specialCharValid={specialCharValid}
                  capitalLetterValid={capitalLetterValid}
                  repeatPasswordValid={repeatPasswordValid}
                  allCriteriaMet={allCriteriaMet}
                />

                <Button type="submit" colorScheme="blue" w="100%">
                  Sign Up
                </Button>
              </VStack>
            </form>
            <Text mt="30%">
              Already a member?{" "}
              <Link
                as="button"
                onClick={() => navigate("/login")}
                textDecoration="underline"
              >
                Log in here.
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default SignUpPage;
