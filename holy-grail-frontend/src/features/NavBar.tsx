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
    <Box
      as="nav"
      position="sticky"
      zIndex="sticky"
      bg="white"
      textAlign="center"
      sx={{
        "> *": {
          marginX: '4',
        },
      }}
      p={4}
    >
      <Box as="span" display="inline-block" verticalAlign="middle">
        <RouterLink to="/">
          <NavBarLogo />
        </RouterLink>
      </Box>
      <Box as="span" display="inline-block" verticalAlign="middle">
        <RouterLink to="/">
          <ClickableText children="Home" />
        </RouterLink>
      </Box>
      <Box as="span" display="inline-block" verticalAlign="middle">
        <Link to="about" smooth={true} duration={500}>
          <ClickableText children="About" />
        </Link>
      </Box>
      <Box as="span" display="inline-block" verticalAlign="middle">
        <RouterLink to="/library">
          <ClickableText children="Library" />
        </RouterLink>
      </Box>
      <Box as="span" display="inline-block" verticalAlign="middle">
        <Link to="features" smooth={true} duration={500}>
          <ClickableText children="Features" />
        </Link>
      </Box>
      <Box as="span" display="inline-block" verticalAlign="middle">
        <Link to="faq" smooth={true} duration={500}>
          <ClickableText children="FAQ" />
        </Link>
      </Box>

      {user ? (
        <Menu>
          <Box as="span" display="inline-block" verticalAlign="middle">
          <MenuButton as={NavBarRightButton}>{user.username}</MenuButton>
          </Box>
          <MenuList>
            {user.role > 1 && (
              <MenuItem onClick={handleAdminButtonClick}>Admin Panel</MenuItem>
            )}
            {/*<MenuItem>Change Password</MenuItem>*/}
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Box as="span" display="inline-block" verticalAlign="middle">
          <RouterLink to="/login">
            <NavBarRightButton children="Log In" />
          </RouterLink>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
