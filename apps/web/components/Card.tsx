import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

const TestCard = () => {
  return (
    <Card width="320px" shadow="md">
      <CardBody gap="2">
        <Avatar size="lg" src="https://picsum.photos/200/300" name="Nue Camp" />
        <Heading size="md" mt="2">
          Nue Camp
        </Heading>
        <Text className="text-red-500">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Text>
      </CardBody>
      <CardFooter>
        <div className="flex gap-2 justify-end w-full">
          <Button variant="outline">View</Button>
          <Button>Join</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
