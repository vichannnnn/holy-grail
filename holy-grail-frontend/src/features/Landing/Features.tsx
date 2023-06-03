import { Box, HStack } from "@chakra-ui/react";
import { Text } from "../../components/Text/Text";
import { FeatureCard } from "./FeatureCard";
import GrailLogo from "../../assets/holy-grail.svg";
import { Grid } from "@chakra-ui/react";

const Features = () => {
  return (

      <Box id="features" display="flex" justifyContent="center" >
      <Grid
        templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}}
        gap={6}
        alignItems="stretch"
      >
        <FeatureCard
          image={GrailLogo}
          headerText="Contribute Notes"
          linkPath="/upload"
        >
          <Box maxHeight={{ base: "100px", md: "auto" }} overflow="auto">
            <Text color="grey" mb={4}>
              Have notes that you don't need anymore or want to share?
            </Text>
            <Text color="grey">
              You can upload your notes to share with other students in need!
              Just click here and make sure that you're logged on.
            </Text>
          <Box/>
        </FeatureCard>
        <FeatureCard
          image={GrailLogo}
          headerText="View Notes Repository"
          linkPath="/library"
        >
          <Box maxHeight={{ base: "100px", md: "auto" }} overflow="auto">
            <Text color="grey" mb={4}>
              Do you need more practice papers or notes?
            </Text>
            <Text color="grey">
              You can search for the practice papers or notes that you need
              based on your level and subject.
            </Text>
            <Text color="grey">Click here to find out more!</Text>
          </Box>
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
    </Grid>
      </Box>

  );
};

export default Features;
