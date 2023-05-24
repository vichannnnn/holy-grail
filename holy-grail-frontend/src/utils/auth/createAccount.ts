import { AxiosError } from "axios";
import apiClient from "../../api/apiClient";
import { useToast } from "@chakra-ui/react";

type ErrorResponseData = {
  detail: string;
};

export const handleRegister = async (
  signUpUsername: string,
  signUpPassword: string,
  signUpRepeatPassword: string,
  signUpEmail: string,
  onSignUpModalClose: () => void
) => {
  const toast = useToast();

  try {
    await apiClient.post("/auth/create", {
      username: signUpUsername,
      password: signUpPassword,
      repeat_password: signUpRepeatPassword,
      email: signUpEmail,
    });

    toast({
      title: "Account successfully created.",
      description: `Please check your email (${signUpEmail}) for the verification link.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onSignUpModalClose();
  } catch (error) {
    let errorDescription =
      "Unable to create account. Please check your input and try again.";
    const axiosError = error as AxiosError<ErrorResponseData>;

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
