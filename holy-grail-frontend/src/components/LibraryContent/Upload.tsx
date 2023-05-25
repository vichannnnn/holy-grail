import { Text, Flex } from "@chakra-ui/react";
import { UploadButton } from "./UploadButton";

const Upload = () => {
  return (
    <div id="faq">
      <Flex direction="column" bgColor="white">
        <Text
          fontSize="5xl"
          fontFamily="Trebuchet MS, sans-serif"
          fontWeight="bold"
        >
          Library
        </Text>
        <Text fontFamily="Trebuchet MS, sans-serif" fontSize="xl" mt="3%">
          This is where the catalogues of notes and practice papers are stored
          at.
        </Text>
        <Text fontFamily="Trebuchet MS, sans-serif" fontSize="xl">
          You can upload notes into the library subjected to approval of the
          administrator, just hit the button below!
        </Text>
      </Flex>
      <UploadButton
        text="Upload"
        mt="50"
        border="2px"
        bg="teal"
        color="white"
        mb="10%"
      />
    </div>
  );
};

export default Upload;
