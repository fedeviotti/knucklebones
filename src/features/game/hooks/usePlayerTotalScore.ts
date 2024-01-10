import { usePlayerPartialScore } from "~/features/game/hooks/usePlayerPartialScore";
import type { PlayerType } from "~/features/game/types";

export const usePlayerTotalScore = ({ playerOrder }: { playerOrder: PlayerType }) => {
  const { column1Score, column2Score, column3Score } = usePlayerPartialScore({ playerOrder });

  return column1Score + column2Score + column3Score;
};
