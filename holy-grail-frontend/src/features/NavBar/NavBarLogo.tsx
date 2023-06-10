import { Image } from "@chakra-ui/react";
import Logo from "../../assets/placeholder.svg";

export const NavBarLogo = () => {
  return (
    <Image src={Logo} ml="10%" boxSize={["2rem", "4rem"]} alt="Your logo" />
  );
};
