import { usePlayerPartialScore } from "~/features/game/hooks/usePlayerPartialScore";
import type { PlayerOrder } from "~/features/game/types";

export const usePlayerTotalScore = ({ playerOrder }: { playerOrder: PlayerOrder }) => {
  const { column1Score, column2Score, column3Score } = usePlayerPartialScore({ playerOrder });

  return column1Score + column2Score + column3Score;
};
