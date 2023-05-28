import { Text as ChakraText, TextProps } from "@chakra-ui/react";

export const Text = ({ children, ...props }: TextProps) => {
  return (
    <ChakraText
      fontFamily="Trebuchet MS, sans-serif"
      color="black"
      fontSize={["sm", "md", "lg", "xl"]}
      {...props}
    >
      {children}
    </ChakraText>
  );
};
