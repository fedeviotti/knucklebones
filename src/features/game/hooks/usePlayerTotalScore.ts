import { usePlayerPartialScore } from "~/features/game/hooks/usePlayerPartialScore";
import type { PlayerType } from "~/features/game/types";

export const usePlayerTotalScore = ({ playerType }: { playerType: PlayerType }) => {
  const { column1Score, column2Score, column3Score } = usePlayerPartialScore({ playerType });

  return column1Score + column2Score + column3Score;
};
