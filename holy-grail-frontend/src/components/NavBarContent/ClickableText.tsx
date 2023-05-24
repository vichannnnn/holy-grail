import { Text } from "@chakra-ui/react";

type ClickableTextProps = {
  children: string;
};

export const ClickableText = ({ children }: ClickableTextProps) => {
  return (
    <Text
      fontSize="md"
      cursor="pointer"
      color="black"
      fontFamily="Trebuchet MS, sans-serif"
    >
      {children}
    </Text>
  );
};
