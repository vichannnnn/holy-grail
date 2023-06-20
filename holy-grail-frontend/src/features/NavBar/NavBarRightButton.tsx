import { Button, Text } from "@chakra-ui/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const NavBarRightButton = forwardRef<
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
        h="30px"
        {...props}
      >
        <Text fontWeight="semibold" color="black">
          {children}
        </Text>
      </Button>
    </>
  );
});

NavBarRightButton.displayName = "NavBarRightButton";
