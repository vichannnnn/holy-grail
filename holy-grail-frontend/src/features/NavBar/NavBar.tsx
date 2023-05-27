import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavBarRightButton } from "./NavBarRightButton";
import { TextLink } from "../../components/TextLink/TextLink";
import { NavBarLogo } from "./NavBarLogo";
import { Link } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

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
    <Flex align="center" justify="space-between" position="sticky" mb="8%">
      <RouterLink to="/">
        <NavBarLogo />
      </RouterLink>
      {isDesktop ? (
        <>
          <RouterLink to="/">
            <TextLink children="Home" />
          </RouterLink>
          <Link to="about" smooth={true} duration={500}>
            <TextLink children="About" />
          </Link>
          <RouterLink to="/library">
            <TextLink children="Library" />
          </RouterLink>
          <Link to="features" smooth={true} duration={500}>
            <TextLink children="Features" />
          </Link>
          <Link to="faq" smooth={true} duration={500}>
            <TextLink children="FAQ" />
          </Link>
        </>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <RouterLink to="/">
              <MenuItem>Home</MenuItem>
            </RouterLink>
            <Link to="about" smooth={true} duration={500}>
              <MenuItem>About</MenuItem>
            </Link>
            <RouterLink to="/library">
              <MenuItem>Library</MenuItem>
            </RouterLink>
            <Link to="features" smooth={true} duration={500}>
              <MenuItem>Features</MenuItem>
            </Link>
            <Link to="faq" smooth={true} duration={500}>
              <MenuItem>FAQ</MenuItem>
            </Link>
            {user ? (
              <>
                {user.role > 1 && (
                  <MenuItem onClick={handleAdminButtonClick}>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </>
            ) : (
              <RouterLink to="/login">
                <MenuItem>Log In</MenuItem>
              </RouterLink>
            )}
          </MenuList>
        </Menu>
      )}
      {isDesktop && (
        <>
          {user ? (
            <Menu>
              <MenuButton as={NavBarRightButton}>{user.username}</MenuButton>
              <MenuList>
                {user.role > 1 && (
                  <MenuItem onClick={handleAdminButtonClick}>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <RouterLink to="/login">
              <NavBarRightButton children="Log In" />
            </RouterLink>
          )}
        </>
      )}
    </Flex>
  );
};

export default NavBar;
