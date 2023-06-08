import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box, useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Text } from "../../components/Text/Text";

type FAQLineProps = {
  question: string;
  children: React.ReactNode;
};

const FAQLine = ({ question, children }: FAQLineProps) => {

  const isDesktop = useBreakpointValue({ base: false, lg: true });

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
              <MinusIcon w={isDesktop ? 5:3} h={isDesktop ? 5:3} mr={3} />
            ) : (
              <AddIcon w={isDesktop ? 5:3} h={isDesktop ? 5:3} mr={3} />
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
