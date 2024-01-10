import { useGame } from "~/features/game/components/GameContext";
import { calculatePartialScore } from "~/features/game/utils/calculatePartialScore";
import type { PlayerType } from "~/features/game/types";

type Props = {
  playerOrder: PlayerType;
};

export const usePlayerPartialScore = ({ playerOrder }: Props) => {
  const { state: { players } } = useGame();
  const values = players.find((p) => p.type === playerOrder)?.values || [];

  return calculatePartialScore({ values });
};
