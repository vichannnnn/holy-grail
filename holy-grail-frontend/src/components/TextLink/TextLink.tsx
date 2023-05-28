import { TextProps } from "@chakra-ui/react";
import { Text } from "../Text/Text";

type TextLinkProps = TextProps & {
  children: string;
};

export const TextLink = ({ children, ...props }: TextLinkProps) => {
  return (
    <Text cursor="pointer" {...props}>
      {children}
    </Text>
  );
};
