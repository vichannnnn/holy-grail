import { AxiosError } from "axios";
import apiClient from "../../api/apiClient";
import { useToast } from "@chakra-ui/react";

export const handleUpdatePassword = async (
  password: string,
  updatePassword: string,
  repeatPassword: string
): Promise<boolean> => {
  const toast = useToast();

  try {
    await apiClient.post("/auth/update_password", {
      before_password: password,
      password: updatePassword,
      repeat_password: repeatPassword,
    });

    toast({
      title: "Password successfully updated.",
      description: "Your password has been changed.",
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
        description:
          "An error occurred while updating your password. Please make sure your input is correct.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return false;
  }
};
