import { Box, BoxProps, Flex } from "@chakra-ui/react";

export const AccountForm = ({ children }: BoxProps) => {
  return (
    <>
      <Flex
        flexDirection="column"
        display="flex"
        alignItems="center"
        width={["80%", "100%"]}
        minH="85vh"
        ml="auto"
        mr="auto"
        mt="10%"
        mb="10%"
      >
        <Box textAlign="left">{children}</Box>
      </Flex>
    </>
  );
};
