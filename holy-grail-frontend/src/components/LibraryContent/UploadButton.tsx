import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type UploadButtonProps = ButtonProps & {
  text: string;
};

export const UploadButton = ({ text, ...props }: UploadButtonProps) => {
  const navigate = useNavigate();

  const handleUploadButtonClick = () => {
    navigate("/upload");
  };

  return (
    <>
      <Button
        variant="outline"
        px="30"
        h="40px"
        onClick={handleUploadButtonClick}
        {...props}
      >
        <Text fontFamily="Trebuchet MS, sans-serif" fontWeight="bold">
          {text}
        </Text>
      </Button>
    </>
  );
};
