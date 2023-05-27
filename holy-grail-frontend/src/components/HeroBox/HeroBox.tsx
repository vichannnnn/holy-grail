import { Box, BoxProps } from "@chakra-ui/react";

export const HeroBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box w="30%" {...props}>
      {children}
    </Box>
  );
};
