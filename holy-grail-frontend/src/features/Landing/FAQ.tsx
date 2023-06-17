import { Accordion, Flex } from "@chakra-ui/react";
import FAQLine from "./FAQLine";
import { Text } from "../../components/Text/Text";
import { TextLink } from "../../components/TextLink/TextLink";
import { Link as RouterLink } from "react-router-dom";

const FAQ = () => {
  return (
    <div id="faq">
      <Text fontSize="5xl" fontWeight="bold" mt={["20%", "10%"]}>
        FAQs
      </Text>
      <Text mt="3%">Need help? We've got you covered!</Text>
      <Flex align="center" justifyContent="center">
        <Accordion
          defaultIndex={[0]}
          mt="5%"
          mb="10%"
          allowMultiple
          allowToggle
          maxWidth="80%"
          width={["80%", "40%"]}
        >
          <FAQLine question="What is the Holy Grail?">
            <Text mb={4} textAlign="left"></Text>
            <Text textAlign="left" color="grey">
              Holy Grail is a collaborative initiative undertaken by students to
              compile a repository of notes and practice papers.
              <br></br>
              <br></br>
              The aim is to support fellow students in their academic journey by
              providing a centralized application that serves as a reliable
              library for these educational resources. The project was initiated
              due to the absence of a suitable platform to store and access such
              resources.
            </Text>
          </FAQLine>

          <FAQLine question="How do I use the Holy Grail?">
            <Text mb={4} textAlign="left" color="grey">
              You can access the resources uploaded over{" "}
              <RouterLink to="/library">
                <TextLink
                  display="inline"
                  color="steelblue"
                  children="here at the Library"
                />
              </RouterLink>
              . Anyone is able to freely access these resources even without
              having an account.
            </Text>
          </FAQLine>

          <FAQLine question="How do I contribute my notes to the Holy Grail?">
            <Text mb={4} textAlign="left" color="grey">
              You can upload the notes that you want to share over{" "}
              <RouterLink to="/upload">
                <TextLink display="inline" color="steelblue" children="here" />
              </RouterLink>
              .<br></br>
              <br></br>
              Do note that you can only upload PDF files and you will need an
              account to start uploading your notes. They will only be available
              to the public after approval.
            </Text>
          </FAQLine>
          <FAQLine question="Will the Holy Grail always be free?">
            <Text mb={4} textAlign="left" color="grey">
              Yes. The entire project and application is done out of initiative
              and will always be free.
            </Text>
          </FAQLine>
        </Accordion>
      </Flex>
    </div>
  );
};

export default FAQ;
