import { Flex } from "@chakra-ui/react";
import { usePlayerPartialScore } from "~/features/game/hooks/usePlayerPartialScore";
import type { PlayerNumber } from "~/features/game/types";

type Props = {
  playerNumber: PlayerNumber;
};

export const PartialScore = ({ playerNumber }: Props) => {
  const { column1Score, column2Score, column3Score } = usePlayerPartialScore({ playerNumber });

  return (
    <Flex gap={4} px={8}>
      <Flex
        width="50px"
        height="50px"
        alignItems="center"
        justifyContent="center"
      >
        {column1Score}
      </Flex>
      <Flex
        width="50px"
        height="50px"
        alignItems="center"
        justifyContent="center"
      >
        {column2Score}
      </Flex>
      <Flex
        width="50px"
        height="50px"
        alignItems="center"
        justifyContent="center"
      >
        {column3Score}
      </Flex>
    </Flex>
  );
};
