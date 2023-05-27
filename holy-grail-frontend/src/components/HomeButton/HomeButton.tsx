import { Button, Text } from "@chakra-ui/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const HomeButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <>
      <Button
        ref={ref}
        variant="outline"
        borderColor="black"
        bg="white"
        px="30"
        h="40px"
        {...props}
      >
        <Text
          fontFamily="Trebuchet MS, sans-serif"
          fontWeight="bold"
          color="black"
        >
          {children}
        </Text>
      </Button>
    </>
  );
});

HomeButton.displayName = "HomeButton";
