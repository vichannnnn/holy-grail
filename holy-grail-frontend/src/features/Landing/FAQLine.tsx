import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Text } from "../../components/Text/Text";

type FAQLineProps = {
  question: string;
  children: React.ReactNode;
};

const FAQLine = ({ question, children }: FAQLineProps) => {
  return (
    <AccordionItem borderColor="transparent">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            fontSize="3xl"
            border="none"
            borderRadius="none"
            _focus={{ outline: "none" }}
          >
            <Box
              as="span"
              flex="1"
              textAlign="left"
              borderColor="transparent"
              border="none"
              background="transparent"
              borderRadius="none"
            >
              <Text>{question}</Text>
            </Box>
            {isExpanded ? (
              <MinusIcon w={5} h={5} mr={3} />
            ) : (
              <AddIcon w={5} h={5} mr={3} />
            )}
          </AccordionButton>

          <AccordionPanel
            pb={4}
            borderColor="transparent"
            border="none"
            background="transparent"
            borderRadius="none"
          >
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FAQLine;
