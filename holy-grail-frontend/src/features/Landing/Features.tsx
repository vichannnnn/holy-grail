import { HStack } from "@chakra-ui/react";
import { Text } from "../../components/Text/Text";
import { FeatureCard } from "./FeatureCard";
import ViteLogo from "../../assets/vite.svg";
import VueLogo from "../../assets/vue.svg";

const Features = () => {
  return (
    <div id="features">
      <HStack justify="center" spacing={2}>
        <FeatureCard image={ViteLogo} headerText="Contribute Notes">
          <>
            <Text color="grey" mb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
              eros nisi. Curabitur sodales, ante et venenatis posuere, nisi urna
              imperdiet eros, sit amet egestas nibh ipsum cursus diam.
            </Text>
            <Text color="grey">
              Quisque posuere sapien vel elit congue, sit amet imperdiet mauris
              suscipit. Aenean sodales ut sapien eget consequat. Fusce sed enim
              suscipit sapien blandit dapibus. Morbi ullamcorper, urna et mollis
              dictum, metus ipsum ornare sem, sed elementum neque lorem non
              erat.
            </Text>
          </>
        </FeatureCard>
        <FeatureCard image={VueLogo} headerText="View Notes">
          <>
            <Text color="#909090" mb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
              eros nisi. Curabitur sodales, ante et venenatis posuere, nisi urna
              imperdiet eros, sit amet egestas nibh ipsum cursus diam.
            </Text>
            <Text color="grey">
              Quisque posuere sapien vel elit congue, sit amet imperdiet mauris
              suscipit. Aenean sodales ut sapien eget consequat. Fusce sed enim
              suscipit sapien blandit dapibus. Morbi ullamcorper, urna et mollis
              dictum, metus ipsum ornare sem, sed elementum neque lorem non
              erat.
            </Text>
          </>
        </FeatureCard>
        {/* <FeatureCard image={ReactLogo} headerText="Download Notes">
        <>
          <Text fontFamily="Trebuchet MS, sans-serif" color="grey" mb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed eros
            nisi. Curabitur sodales, ante et venenatis posuere, nisi urna
            imperdiet eros, sit amet egestas nibh ipsum cursus diam.
          </Text>
          <Text fontFamily="Trebuchet MS, sans-serif"  color="grey">
            Quisque posuere sapien vel elit congue, sit amet imperdiet mauris
            suscipit. Aenean sodales ut sapien eget consequat. Fusce sed enim
            suscipit sapien blandit dapibus. Morbi ullamcorper, urna et mollis
            dictum, metus ipsum ornare sem, sed elementum neque lorem non erat.
          </Text>
        </>
      </FeatureCard> */}
      </HStack>
    </div>
  );
};

export default Features;
