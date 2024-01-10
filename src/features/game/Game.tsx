import { useGame } from "~/features/game/components/GameContext";
import type { GameFormValues } from "~/features/game/components/GameForm";
import { GameForm } from "~/features/game/components/GameForm";
import { GameBoard } from "~/features/game/components/GameBoard";
import * as React from "react";
import { api } from "~/utils/api";

const INITIAL_VALUES = {
  playerOne: "",
  playerTwo: "",
};

export const Game = () => {
  const { state: { players }, dispatch } = useGame();
  const startGame = api.game.startGame.useMutation();
  const onSubmitHandler = async (values: GameFormValues) => {
    startGame.mutate({
      player: values.playerOne,
      opponent: values.playerTwo,
    }, {
      onSuccess: (data) => {
        dispatch({ type: "startGame", payload: { ...values, gameId: data.id } });
      },
    });
  };

  if (players.length === 2) {
    return <GameBoard onQuit={() => dispatch({ type: "quitGame" })} />;
  }

  return (
    <GameForm
      initialValues={INITIAL_VALUES}
      onSubmit={(values) => onSubmitHandler(values)}
      isSubmitting={startGame.status === "loading"}
    />
  );
};
