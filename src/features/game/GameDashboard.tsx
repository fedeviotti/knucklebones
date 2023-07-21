import * as React from "react";
import { Button, Divider, Stack } from "@chakra-ui/react";
import { type Players } from "~/pages";
import { PlayerDashboard } from "~/features/game/PlayerDashboard";

interface Props {
  players: Players;
  onQuit: () => void;
}
export const GameDashboard = ({ onQuit, players }: Props) => {
  const { name: namePlayerOne, values: valuesPlayerOne } = players.playerOne;
  const { name: namePlayerTwo, values: valuesPlayerTwo } = players.playerTwo;
  const [round, setRound] = React.useState(0);

  return (
    <Stack>
      <Button onClick={onQuit} alignSelf="start">Quit game</Button>
      <PlayerDashboard
        name={namePlayerOne}
        values={valuesPlayerOne}
        round={round}
      />
      <Divider />
      <PlayerDashboard
        name={namePlayerTwo}
        values={valuesPlayerTwo}
        round={round}
        position="right"
      />
    </Stack>
  );
};
