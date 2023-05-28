import { Text as ChakraText, TextProps } from "@chakra-ui/react";

export const Title = ({ children, ...props }: TextProps) => {
  return (
    <ChakraText
      fontWeight="bold"
      fontSize={["xl", "3xl", "5xl", "7xl"]}
      color="black"
      lineHeight="1"
      {...props}
    >
      {children}
    </ChakraText>
  );
};
