import { Accordion, Flex, Text } from "@chakra-ui/react";
import FAQLine from "../components/FAQContent/FAQLine";

const FAQ = () => {
  return (
    <div id="faq">
      <Text
        fontSize="5xl"
        fontFamily="Trebuchet MS, sans-serif"
        fontWeight="bold"
        mt="10%"
      >
        FAQ's
      </Text>
      <Text fontFamily="Trebuchet MS, sans-serif" mt="3%">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed eros
        nisi. Curabitur sodales, ante et venenatis posuere.
      </Text>
      <Flex align="center" justifyContent="center" minH="100vh">
        <Accordion
          defaultIndex={[0]}
          mt="10%"
          mb="30%"
          allowMultiple
          allowToggle
          maxW="80%"
          width="100%"
          borderWidth="0"
        >
          <FAQLine question="What is secure web hosting?">
            <Text mb={4} fontFamily="Trebuchet MS, sans-serif" textAlign="left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text fontFamily="Trebuchet MS, sans-serif" textAlign="left">
              Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Vivamus a venenatis risus, a iaculis enim.
              Curabitur dignissim porta lorem eget ultrices. Phasellus eu magna
              rutrum, aliquet tellus ac, egestas neque. Etiam egestas ac tellus
              at placerat. Sed gravida dui non magna porta, ut porttitor nulla
              lobortis. Nullam orci mauris, auctor at est at, egestas rutrum
              diam. Sed et nunc dolor.
            </Text>
          </FAQLine>

          <FAQLine question="How do I get started?">
            <Text fontFamily="Trebuchet MS, sans-serif" mb={4} textAlign="left">
              Orci varius natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Vivamus a venenatis risus, a iaculis enim.
              Curabitur dignissim porta lorem eget ultrices. Phasellus eu magna
              rutrum, aliquet tellus ac, egestas neque. Etiam egestas ac tellus
              at placerat. Sed gravida dui non magna porta, ut porttitor nulla
              lobortis. Nullam orci mauris, auctor at est at, egestas rutrum
              diam. Sed et nunc dolor.
            </Text>
            <Text fontFamily="Trebuchet MS, sans-serif" textAlign="left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </FAQLine>
        </Accordion>
      </Flex>
    </div>
  );
};

export default FAQ;
