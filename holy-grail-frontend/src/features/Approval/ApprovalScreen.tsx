import { Box } from "@mui/material";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";

const ApprovalScreen = () => {
  return (
    <div id="upload">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Title>Administrator Panel</Title>
        <Text fontSize="xl" mt="3%" mb="10%">
          This is a list of unapproved notes and where you can choose to approve
          or delete the submitted notes.
        </Text>
      </Box>
    </div>
  );
};

export default ApprovalScreen;
