import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { PlayerBoard } from "~/features/game/components/PlayerBoard";
import { useGameOver } from "~/features/game/hooks/useGameOver";
import { AnimatePresence } from "framer-motion";
import { useGameWinner } from "~/features/game/hooks/useGameWinner";
import { api } from "~/utils/api";
import { GameOverModal } from "~/features/game/components/GameOverModal";

interface Props {
  onQuit: () => void;
}

export const GameBoard = ({ onQuit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameId, isGameOver } = useGameOver();
  const { winnerName, score, delta } = useGameWinner();
  const endGame = api.game.endGame.useMutation();

  React.useEffect(() => {
    if (isGameOver) {
      onOpen();
    }
  }, [isGameOver, onOpen]);

  const onCloseHandler = React.useCallback(() => {
    endGame.mutate({
      gameId,
      winner: winnerName,
      score,
      delta,
    });
    onClose();
    onQuit();
  }, [delta, endGame, gameId, onClose, onQuit, score, winnerName]);

  return (
    <Box pt={4} pb={8} px={4} borderWidth="1px" borderRadius="lg" alignItems="center" bg="orange.50">
      <Stack direction="column" spacing={12}>
        <Button onClick={onQuit} alignSelf="start" colorScheme={isGameOver ? "primary" : "gray"}>Quit game</Button>
        <Stack direction="column" spacing={4} alignItems="center">
          <PlayerBoard playerOrder="player" />
          <Divider />
          <PlayerBoard playerOrder="opponent" />
        </Stack>
      </Stack>
      <AnimatePresence>
        {isOpen && (
        <GameOverModal
          isOpen={isOpen}
          onClose={onCloseHandler}
          winnerName={winnerName}
        />
        )}
      </AnimatePresence>
    </Box>
  );
};
