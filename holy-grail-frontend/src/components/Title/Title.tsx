import { Text as ChakraText, TextProps } from "@chakra-ui/react";

export const Title = ({ children, ...props }: TextProps) => {
  return (
    <ChakraText
      fontWeight="bold"
      fontSize="4xl"
      color="black"
      lineHeight="1"
      {...props}
    >
      {children}
    </ChakraText>
  );
};
