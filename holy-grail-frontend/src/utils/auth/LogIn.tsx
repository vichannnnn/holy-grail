import { useContext } from "react";
import { AxiosError } from "axios";
import AuthContext from "../../providers/AuthProvider";
import { useToast } from "@chakra-ui/react";

export const handleLogin = async (username: string, password: string) => {
  const { login } = useContext(AuthContext);
  const toast = useToast();

  try {
    await login(username, password);
  } catch (error) {
    let errorDescription = "Invalid username or password.";
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 403) {
      errorDescription =
        "Please verify your email using the verification email sent to your account before logging in.";
    }

    toast({
      title: "Login failed.",
      description: errorDescription,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
