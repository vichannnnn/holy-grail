import { Box, BoxProps, Flex } from "@chakra-ui/react";

export const AccountForm = ({ children }: BoxProps) => {
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box width={["100%", "70%", "50%", "30%"]} textAlign="left">
          {children}
        </Box>
      </Flex>
    </>
  );
};
