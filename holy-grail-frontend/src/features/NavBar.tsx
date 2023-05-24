import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { NavBarRightButton } from "../components/NavBarContent/NavBarRightButton";
import { ClickableText } from "../components/NavBarContent/ClickableText";
import { NavBarLogo } from "../components/NavBarContent/NavBarLogo";
import { Link } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../providers/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAdminButtonClick = () => {
    navigate("/admin");
  };

  const handleLogout = async () => {
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

  return (
    <Flex
      align="center"
      justify="space-between"
      w="56vw"
      position="sticky"
      mb="8%"
    >
      <RouterLink to="/">
        <NavBarLogo />
      </RouterLink>
      <RouterLink to="/">
        <ClickableText children="Home" />
      </RouterLink>
      <Link to="about" smooth={true} duration={500}>
        <ClickableText children="About" />
      </Link>
      <RouterLink to="/library">
        <ClickableText children="Library" />
      </RouterLink>
      <Link to="features" smooth={true} duration={500}>
        <ClickableText children="Features" />
      </Link>
      <Link to="faq" smooth={true} duration={500}>
        <ClickableText children="FAQ" />
      </Link>

      {user ? (
        <Menu>
          <MenuButton as={NavBarRightButton}>{user.username}</MenuButton>
          <MenuList>
            {user.role > 1 && (
              <MenuItem onClick={handleAdminButtonClick}>Admin Panel</MenuItem>
            )}
            <MenuItem>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Box>
          <RouterLink to="/login">
            <NavBarRightButton children="Log In" />
          </RouterLink>
        </Box>
      )}
    </Flex>
  );
};

export default NavBar;
