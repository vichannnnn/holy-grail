import { Box, BoxProps } from "@chakra-ui/react";

const HeroBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box w="30%" {...props}>
      {children}
    </Box>
  );
};

export default HeroBox;
