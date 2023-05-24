import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useToast } from "@chakra-ui/react";

export const handleLogout = async () => {
  const { logout } = useContext(AuthContext);
  const toast = useToast();

  try {
    logout();
  } catch (error) {
    toast({
      title: "Logout failed.",
      description: "An error occurred while logging out.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
