import * as React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Die } from "~/features/game/components/Die";
import { useGame } from "~/features/game/components/GameContext";
import { api } from "~/utils/api";
import { calculateTotalScore } from "~/features/game/utils/calculateTotalScore";
import { calculatePlayerUpdatedValues } from "~/features/game/utils/calculatePlayerUpdatedValues";
import { calculateOpponentUpdatedValues } from "~/features/game/utils/calculateOpponentUpdatedValues";
import type { PlayerType } from "~/features/game/types";

interface Props {
  playerType: PlayerType;
}

export const DiceBoard = ({ playerType }: Props) => {
  const { state: { players, gameId }, dispatch } = useGame();
  const currentContender = React.useMemo(
    () => players.find((p) => p.type === playerType),
    [playerType, players],
  );
  const player = players.find((p) => p.type === "player");
  const opponent = players.find((p) => p.type === "opponent");
  const calculatePlayerValuesFunction = playerType === "player" ? calculatePlayerUpdatedValues : calculateOpponentUpdatedValues;
  const calculateOpponentValuesFunction = playerType === "player" ? calculateOpponentUpdatedValues : calculatePlayerUpdatedValues;
  const addMove = api.game.addMove.useMutation();

  const onClickHandler = React.useCallback((position: number) => {
    if (currentContender?.valueToInsert) {
      const calculatedPlayerValues = calculatePlayerValuesFunction({
        values: player?.values || Array(9).fill(0),
        valueToInsert: currentContender?.valueToInsert || 0,
        position,
      });
      const calculatedPlayerScore = calculateTotalScore({ values: calculatedPlayerValues });
      const calculatedOpponentValues = calculateOpponentValuesFunction({
        values: opponent?.values || Array(9).fill(0),
        valueToInsert: currentContender?.valueToInsert || 0,
        position,
      });
      const calculatedOpponentScore = calculateTotalScore({ values: calculatedOpponentValues });
      dispatch({
        type: "placeDie",
        payload: {
          calculatedPlayerValues, calculatedOpponentValues,
        },
      });
      dispatch({ type: "addRound" });
      addMove.mutate({
        gameId,
        player: player?.name || "",
        opponent: opponent?.name || "",
        playerValues: calculatedPlayerValues,
        opponentValues: calculatedOpponentValues,
        playerScore: calculatedPlayerScore,
        opponentScore: calculatedOpponentScore,
      });
    }
  }, [
    addMove,
    calculateOpponentValuesFunction,
    calculatePlayerValuesFunction,
    currentContender?.valueToInsert,
    dispatch,
    gameId,
    opponent?.name,
    opponent?.values,
    player?.name,
    player?.values,
  ]);

  return (
    <Flex justifyContent="center" alignItems="center" px={8} grow={1}>
      <SimpleGrid columns={3} row={3} spacing={4}>
        {currentContender?.values.map((value, index) => (
          <Die
            key={crypto.randomUUID()}
            value={value}
            onClick={() => onClickHandler(index)}
            isClickable={!!currentContender?.valueToInsert}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
