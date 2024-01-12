import { Flex } from "@chakra-ui/react";
import { usePlayerPartialScore } from "~/features/game/hooks/usePlayerPartialScore";
import type { PlayerType } from "~/features/game/types";

type Props = {
  playerType: PlayerType;
};

export const PartialScore = ({ playerType }: Props) => {
  const { column1Score, column2Score, column3Score } = usePlayerPartialScore({ playerType });

  return (
    <Flex gap={4} px={8} grow={1} justifyContent="center">
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
