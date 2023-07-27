import { usePlayerTotalScore } from "~/features/game/hooks/usePlayerTotalScore";
import { useGame } from "~/features/game/components/GameContext";
import { useGameOver } from "~/features/game/hooks/useGameOver";

export const useGameWinner = () => {
  const { state: { players } } = useGame();
  const { isGameOver } = useGameOver();
  const playerScore = usePlayerTotalScore({ playerOrder: "player" });
  const opponentScore = usePlayerTotalScore({ playerOrder: "opponent" });
  const winnerOrder = playerScore > opponentScore ? "player" : "opponent";

  if (isGameOver) {
    return {
      winnerName: players.find((p) => p.order === winnerOrder)?.name || "Player",
      score: Math.max(playerScore, opponentScore),
      delta: Math.abs(playerScore - opponentScore),
    };
  }

  return {
    winnerName: "",
    score: 0,
    delta: 0,
  };
};
