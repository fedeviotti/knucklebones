import {
  Button, Flex, Heading, HStack, Text,
} from "@chakra-ui/react";
import React from "react";
import type { PlayerOrder } from "~/features/game/types";
import { useGame } from "~/features/game/components/GameContext";
import { usePlayerTotalScore } from "~/features/game/hooks/usePlayerTotalScore";

type Props = {
  playerOrder: PlayerOrder;
};

export const PlayerConsole = ({
  playerOrder,
}: Props) => {
  const { state: { players, round }, dispatch } = useGame();
  const totalScore = usePlayerTotalScore({ playerOrder });
  const currentContender = React.useMemo(
    () => players.find((p) => p.order === playerOrder),
    [playerOrder, players],
  );
  const remainder = playerOrder === "player" ? 1 : 0;

  return (
    <Flex direction="column" width="400px" gap={2}>
      <Heading>{currentContender?.name}</Heading>
      <Text fontWeight="bold">
        {`Total score: ${totalScore}`}
      </Text>
      <Button
        isDisabled={
          round % 2 === remainder
            || players.some((player) => player.values.every((value) => value !== 0))
        }
        colorScheme="primary"
        alignSelf="start"
        onClick={() => dispatch({ type: "rollDie", payload: { playerOrder } })}
      >
        Roll the dice
      </Button>
      <HStack>
        <Text>Die to insert</Text>
        <Flex
          width="50px"
          height="50px"
          alignItems="center"
          justifyContent="center"
          borderWidth="1px"
          borderRadius="lg"
        >
          {(currentContender?.valueToPlace || 0) > 0 ? currentContender?.valueToPlace : "-"}
        </Flex>
      </HStack>
    </Flex>
  );
};
