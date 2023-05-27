import { Box, BoxProps, Flex } from "@chakra-ui/react";

const AccountForm = ({ children }: BoxProps) => {
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box width={["100%", "80%", "70%", "50%"]} textAlign="left">
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default AccountForm;
