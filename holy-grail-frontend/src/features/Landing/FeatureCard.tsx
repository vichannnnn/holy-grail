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

type FeatureCardProps = CardProps & {
  headerText: string;
  image?: string;
  children: React.ReactNode;
};

export const FeatureCard = ({
  headerText,
  image,
  children,
  ...props
}: FeatureCardProps) => {
  return (
    <LinkBox>
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
