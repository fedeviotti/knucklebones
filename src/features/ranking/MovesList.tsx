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
  <Stack direction="row" fontSize="lg" spacing={8} px={4}>
    <Text noOfLines={1} minW="180px">
      <span>{name}</span>
    </Text>
    <Text noOfLines={1} letterSpacing={1} fontFamily="monospace" minW="200px">
      {formatValues(values)}
    </Text>
    <Text minW="10px" textAlign="end">{" = "}</Text>
    <Text minW="40px" textAlign="end">{score}</Text>
  </Stack>
);

type Props = {
  gameId: string;
};
export const MovesList = ({ gameId }: Props) => {
  const getMoves = api.game.getMovesByGame.useQuery({ gameId });

  if (getMoves.isLoading) {
    return (
      <Stack spacing={2} px={4}>
        <Skeleton height="24px" />
        <Skeleton height="24px" />
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
        <Flex key={id} direction="row" justifyContent="space-between" gap={8}>
          <MoveDetailBlock name={player} values={playerValues} score={playerScore} />
          <Text>{" - "}</Text>
          <MoveDetailBlock name={opponent} values={opponentValues} score={opponentScore} />
        </Flex>
      ))}
    </Stack>
  );
};
