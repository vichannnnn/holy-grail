import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";
import PasswordValidationBox from "./PasswordValidationBox";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { AccountForm } from "../../components/AccountForm/AccountForm";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
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
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    setUsernameValid(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    setLengthValid(password.length <= 30 && password.length >= 8);
    setSpecialCharValid(/[!@#$%^&*]/.test(password));
    setCapitalLetterValid(/[A-Z]/.test(password));
    setRepeatPasswordValid(password === repeatPassword && password !== "");
  }, [password, repeatPassword]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameValid) {
      toast({
        title: "Invalid username.",
        description:
          "Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await apiClient.post("/auth/create", {
        username: username,
        password: password,
        repeat_password: repeatPassword,
        email: email,
      });

      toast({
        title: "Account successfully created.",
        description: `A verification email has been sent to your email (${email}). You won't be able to upload resources until you have verified your email.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      let errorDescription =
        "Unable to create account. Please check your input and try again.";

      type ErrorResponseData = {
        detail: string;
      };

      const axiosError = error as AxiosError<ErrorResponseData>;

      if (axiosError.response && axiosError.response.status === 409) {
        if (axiosError.response.data.detail === "Username already exists") {
          errorDescription = "An account with this username already exists.";
        }
      } else if (axiosError.response && axiosError.response.status === 400) {
        errorDescription =
          "Your password does not match. Please check your password and try again.";
      } else if (axiosError.response && axiosError.response.status === 422) {
        errorDescription =
          "Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.";
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
      <AccountForm>
        <Title mb="5%">Sign up</Title>
        <Text mb="10%">Create an account to access all features.</Text>

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
        <Box textAlign="center">
          <Text mt="5%" fontSize={["sm", "md"]}>
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
      </AccountForm>
    </>
  );
};

export default SignUpPage;
