import { Text, Button, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";


type UploadButtonProps = ButtonProps & {
  text: string;
};

export const UploadButton = ({ text, ...props }: UploadButtonProps) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUploadButtonClick = () => {
    if (user) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
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
        <Text fontWeight="bold">{text}</Text>
      </Button>
    </>
  );
};
