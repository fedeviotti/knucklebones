import * as React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Heading, Skeleton, Stack, Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { MovesList } from "~/features/ranking/MovesList";

const History = () => {
  const { query: { playerName }, back } = useRouter();
  const getGames = api.game.getGamesByPlayer.useQuery({
    playerName: playerName as string,
  }, {
    enabled: !!playerName,
  });

  const calculateGameScore = (delta: number, winner: string) => {
    if (winner === playerName) {
      return ((delta || 0) * 10) + 10;
    }
    return 10;
  };

  const getContent = () => {
    if (getGames.isLoading) {
      return (
        <Stack spacing={12} px={4}>
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </Stack>
      );
    }
    return (
      getGames.data?.map(({
        id, player, opponent, delta, winner,
      }) => (
        <Stack key={id}>
          <Text fontSize="2xl" px={4}>
            {`vs. ${player === playerName ? opponent : player}: +${calculateGameScore(delta || 0, winner || "")} pts.`}
          </Text>
          <MovesList gameId={id} />
        </Stack>
      ))
    );
  };

  return (
    <>
      <Head>
        <title>{`${playerName}'s History`}</title>
        <meta name="description" content={`${playerName}'s History`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing={16}>
        <Button onClick={back} alignSelf="center">Back to ranking</Button>
        <Heading alignSelf="center">{`${playerName}'s History`}</Heading>
        <Box>
          <Box py={4} borderWidth="1px" borderRadius="lg" alignItems="center" bg="orange.50" overflow="auto">
            <Stack spacing={12}>
              {getContent()}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default History;
