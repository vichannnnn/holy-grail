import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";
import PasswordValidationBox from "../SignUp/PasswordValidationBox";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { AccountForm } from "../../components/AccountForm/AccountForm";

const ChangePasswordPage = () => {
  const [beforePassword, setBeforePassword] = useState("");
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

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/update_password", {
        before_password: beforePassword,
        password: password,
        repeat_password: repeatPassword,
      });

      toast({
        title: "Password successfully updated.",
        description: `You can now log in with your new password.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      let errorDescription =
        "Unable to update password. Please check your input and try again.";

      type ErrorResponseData = {
        detail: string;
      };

      const axiosError = error as AxiosError<ErrorResponseData>;

      if (axiosError.response && axiosError.response.status === 401) {
        errorDescription = "The password you've entered is invalid.";
      } else if (axiosError.response && axiosError.response.status === 400) {
        errorDescription =
          "Your password does not match. Please check your password and try again.";
      } else if (axiosError.response && axiosError.response.status === 422) {
        errorDescription = "Please ensure your new password format is valid";
      }

      toast({
        title: "Password Update failed.",
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
        <Title mb="5%">Update Password</Title>
        <Text mb="15%">You can change your password here.</Text>

        <form onSubmit={handleUpdatePassword}>
          <VStack spacing="6">
            <FormControl id="before-password">
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                value={beforePassword}
                onChange={(e) => setBeforePassword(e.target.value)}
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
              Update Password
            </Button>
          </VStack>
        </form>
      </AccountForm>
    </>
  );
};

export default ChangePasswordPage;
