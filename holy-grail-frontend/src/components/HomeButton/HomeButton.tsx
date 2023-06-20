import { Button } from "@chakra-ui/react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Text } from "../Text/Text";

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
        <div className="button-text">{children}</div>
      </Button>
    </>
  );
});

HomeButton.displayName = "HomeButton";
