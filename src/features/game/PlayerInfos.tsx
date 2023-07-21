import {
  Button, Flex, Heading, Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  name: string;
  round: number;
  showDetails: boolean;
  remainder: number;
};

export const PlayerInfos = ({
  name, round, showDetails, remainder,
}: Props) => (
  <Flex direction="column" width="300px" maxWidth="300px" gap={2}>
    {showDetails && (
    <>
      <Heading>{name}</Heading>
      <Text>Score: calculate total score</Text>
      <Button
        isDisabled={round % 2 === remainder}
        colorScheme="primary"
        alignSelf="start"
      >
        Roll the dice
      </Button>
    </>
    )}
  </Flex>
);
