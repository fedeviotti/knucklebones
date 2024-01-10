import {
  Button, Flex, Heading, HStack, Text,
} from "@chakra-ui/react";
import React from "react";
import type { PlayerType } from "~/features/game/types";
import { useGame } from "~/features/game/components/GameContext";
import { usePlayerTotalScore } from "~/features/game/hooks/usePlayerTotalScore";
import { Die } from "~/features/game/components/Die";
import { BsPlayFill } from "react-icons/bs";

type Props = {
  playerOrder: PlayerType;
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
    <Flex direction="column" gap={2} minWidth={[null, "200px"]}>
      <Heading>{currentContender?.name}</Heading>
      <Text fontWeight="bold">
        {`Total score: ${totalScore}`}
      </Text>
      <Button
        rightIcon={<BsPlayFill />}
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
        <Die
          value={(currentContender?.valueToPlace || 0) > 0
            ? (currentContender?.valueToPlace || 0)
            : 0}
        />
      </HStack>
    </Flex>
  );
};
