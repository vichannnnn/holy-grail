import { Text, TextProps } from "@chakra-ui/react";

type HeroTextProps = TextProps & {
  text: string;
};

export const HeroText = ({ text, ...props }: HeroTextProps) => {
  return (
    <Text
      fontFamily="Trebuchet MS, sans-serif"
      color="black"
      fontSize="xl"
      {...props}
    >
      {text}
    </Text>
  );
};
