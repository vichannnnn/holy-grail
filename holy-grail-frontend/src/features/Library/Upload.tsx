import { Flex } from "@chakra-ui/react";
import { UploadButton } from "./UploadButton";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";

const Upload = () => {
  return (
    <div id="upload">
      <Flex direction="column" bgColor="white" mt="5%" mr="auto" ml="auto" maxW="80%">
        <Title fontSize={["3xl", "7xl"]}>Library</Title>
        <Text mt="5%">
          This is where the catalogues of notes and practice papers are stored
          at.
        </Text>
        <Text>
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
        mb="5%"
      />
    </div>
  );
};

export default Upload;
