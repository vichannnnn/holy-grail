import {
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext, { User } from "../../providers/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const handleAdminButtonClick = () => {
    navigate("/admin");
  };

  const handleDevButtonClick = () => {
    navigate("/developer");
  };

  const handlePasswordChange = () => {
    navigate("/update_password");
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
      width="100%"
      top="0"
      zIndex="10"
      alignItems="center"
      justify="space-between"
      position="sticky"
      minWidth="50vw"
    >
      <RouterLink to="/">
        <NavBarLogo />
      </RouterLink>
      {isDesktop ? (
        <>
          <RouterLink to="/">
            <TextLink children="Home" />
          </RouterLink>
          <RouterLink to="/#about">
            <TextLink children="About" />
          </RouterLink>
          <RouterLink to="/library">
            <TextLink children="Library" />
          </RouterLink>
          <RouterLink to="/#features">
            <TextLink children="Features" />
          </RouterLink>
          <RouterLink to="/#faq">
            <TextLink children="FAQ" />
          </RouterLink>
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
            <RouterLink to="/#about">
              <MenuItem>About</MenuItem>
            </RouterLink>
            <RouterLink to="/library">
              <MenuItem>Library</MenuItem>
            </RouterLink>
            <RouterLink to="/#features">
              <MenuItem>Features</MenuItem>
            </RouterLink>
            <RouterLink to="/#faq">
              <MenuItem>FAQ</MenuItem>
            </RouterLink>
            {user ? (
              <>
                {user.role > 1 && (
                  <MenuItem onClick={handleAdminButtonClick}>
                    Admin Panel
                  </MenuItem>
                )}
                {user.role > 2 && (
                  <MenuItem onClick={handleDevButtonClick}>
                    Developer Panel
                  </MenuItem>
                )}
                {
                  <MenuItem onClick={handlePasswordChange}>
                    Change Password
                  </MenuItem>
                }
                {!user.verified && (
                  <MenuItem onClick={handleDevButtonClick}>
                    Resend Verification Email
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
                {user.role > 2 && (
                  <MenuItem onClick={handleDevButtonClick}>
                    Developer Panel
                  </MenuItem>
                )}
                {
                  <MenuItem onClick={handlePasswordChange}>
                    Change Password
                  </MenuItem>
                }
                {!user.verified && (
                  <MenuItem onClick={handleDevButtonClick}>
                    Resend Verification Email
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
