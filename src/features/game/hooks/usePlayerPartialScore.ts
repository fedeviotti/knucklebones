import { useGame } from "~/features/game/components/GameContext";
import { calculatePartialScore } from "~/features/game/utils/calculatePartialScore";
import type { PlayerOrder } from "~/features/game/types";

type Props = {
  playerOrder: PlayerOrder;
};

export const usePlayerPartialScore = ({ playerOrder }: Props) => {
  const { state: { players } } = useGame();
  const values = players.find((p) => p.order === playerOrder)?.values || [];

  return calculatePartialScore({ values });
};
