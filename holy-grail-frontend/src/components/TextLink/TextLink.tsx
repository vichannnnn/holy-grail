import { Text } from "@chakra-ui/react";

type TextLinkProps = {
  children: string;
};

export const TextLink = ({ children }: TextLinkProps) => {
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
