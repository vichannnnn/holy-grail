import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  CardProps,
  Image,
  Box,
  LinkBox,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type FeatureCardProps = CardProps & {
  headerText: string;
  image?: string;
  children: React.ReactNode;
  linkPath?: string;
};

export const FeatureCard = ({
  headerText,
  image,
  children,
  linkPath,
  ...props
}: FeatureCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (linkPath) {
      navigate(linkPath); // Use history.push to navigate to the new path
    }
  };

  return (
    <LinkBox onClick={handleCardClick}>
      <Card
        maxW="sm"
        as={Box}
        transition="all 0.2s"
        _hover={{ backgroundColor: "gray.100", boxShadow: "xl" }}
        borderWidth="1px"
        border="transparent"
      >
        {image ? (
          <Image src={image} mt="10%" mb="2%" mr="40%" ml="40%" />
        ) : null}
        <CardHeader>
          <Heading fontSize="24px" fontFamily="Trebuchet MS, sans-serif">
            {headerText}
          </Heading>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter mx="auto"></CardFooter>
      </Card>
    </LinkBox>
  );
};
