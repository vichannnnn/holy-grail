import { Flex } from "@chakra-ui/react";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import "./approval.css"

const ApprovalScreen = () => {
  return (
    <section id="upload">
      <div>
        <div className="approval__title">Administrator Panel</div>
        <div className="section__subtitle">
          This is a list of unapproved notes for your review, you can approve or delete them accordingly.
        </div>
      </div>
    </section>
  );
};

export default ApprovalScreen;
