import { useGame } from "~/features/game/components/GameContext";
import { calculatePartialScore } from "~/features/game/utils/calculatePartialScore";
import type { PlayerType } from "~/features/game/types";

type Props = {
  playerType: PlayerType;
};

export const usePlayerPartialScore = ({ playerType }: Props) => {
  const { state: { players } } = useGame();
  const values = players.find((p) => p.type === playerType)?.values || [];

  return calculatePartialScore({ values });
};
