import { FormEvent, useState } from "react";
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
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { AccountForm } from "../../components/AccountForm/AccountForm";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/send_reset_password_mail", {
        email: email,
      });

      toast({
        title: "Password reset email successfully sent.",
        description: `Please check your email for the email sent to you.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      let errorDescription =
        "Unable to reset password. Please check your input and try again.";

      type ErrorResponseData = {
        detail: string;
      };

      const axiosError = error as AxiosError<ErrorResponseData>;

      if (axiosError.response && axiosError.response.status === 429) {
        errorDescription =
          "You're doing this too fast. Please try again later.";
      }

      toast({
        title: "Reset Password failed.",
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
        <Title mb="5%">Forgot Password</Title>
        <Text mb="15%">
          Please enter the email you registered with to reset your password.
        </Text>

        <form onSubmit={handleResetPassword}>
          <VStack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="100%">
              Reset Password
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

export default ForgotPasswordPage;