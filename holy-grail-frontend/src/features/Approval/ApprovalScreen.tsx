import { Flex } from "@chakra-ui/react";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";

const ApprovalScreen = () => {
  return (
    <div id="upload">
      <Flex direction="column" bgColor="white">
        <Title>Administrator Panel</Title>
        <Text fontSize="xl" mt="3%" mb="10%">
          This is a list of unapproved notes and where you can choose to approve
          or delete the submitted notes.
        </Text>
      </Flex>
    </div>
  );
};

export default ApprovalScreen;
