import { AxiosError } from "axios";
import apiClient from "../../api/apiClient";
import { useToast } from "@chakra-ui/react";

export const handleUpdateEmail = async (email: string): Promise<boolean> => {
  const toast = useToast();

  try {
    await apiClient.put("/auth/update_email", {
      email: email,
    });

    toast({
      title: "Email successfully updated.",
      description:
        "Your email address has been changed. Please check your email for the verification link.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 422) {
      toast({
        title: "Update failed.",
        description: "Please make sure you have entered a valid email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (axiosError.response && axiosError.response.status === 409) {
      toast({
        title: "Update failed.",
        description: "The email address is already in use.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return false;
  }
};
