import * as React from "react";
import { api } from "~/utils/api";
import {
  Flex,
  Skeleton, Stack, Text,
} from "@chakra-ui/react";
import { formatValues } from "~/features/ranking/utils";

type MoveDetailBlockProps = {
  name: string;
  values: string;
  score: number;
};
const MoveDetailBlock = ({ name, values, score }: MoveDetailBlockProps) => (
  <Stack direction="row" w="100%" justifyContent="space-between" fontSize="lg">
    <Text width="150px" noOfLines={1}>{name}</Text>
    <Text width="230px" letterSpacing={1} fontFamily="monospace">{formatValues(values)}</Text>
    <Text>{" = "}</Text>
    <Text width="50px">{score}</Text>
  </Stack>
);

type Props = {
  gameId: string;
};
export const MovesList = ({ gameId }: Props) => {
  const getMoves = api.game.getMovesByGame.useQuery({ gameId });

  if (getMoves.isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton height="24px" />
        <Skeleton height="24px" />
        <Skeleton height="24px" />
      </Stack>
    );
  }

  return (
    <Stack>
      {getMoves.data?.map(({
        id, player, opponent, playerValues, opponentValues, playerScore, opponentScore,
      }) => (
        <Flex key={id} direction="row" justifyContent="center">
          <MoveDetailBlock name={player} values={playerValues} score={playerScore} />
          <Text pr={8}>{" - "}</Text>
          <MoveDetailBlock name={opponent} values={opponentValues} score={opponentScore} />
        </Flex>
      ))}
    </Stack>
  );
};
