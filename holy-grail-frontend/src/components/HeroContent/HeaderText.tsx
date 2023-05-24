import { Text } from "@chakra-ui/react";

type HeaderTextProps = {
  text: string;
};

export const HeaderText = ({ text, ...props }: HeaderTextProps) => {
  return (
    <Text
      fontWeight="bold"
      fontSize="7xl"
      color="black"
      lineHeight="1"
      {...props}
    >
      {text}
    </Text>
  );
};
