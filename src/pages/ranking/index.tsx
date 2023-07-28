import {
  Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
  Skeleton, Box,
} from "@chakra-ui/react";
import * as React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import NextLink from "next/link";
import { TotalScore } from "~/features/ranking/TotalScore";

const Ranking = () => {
  const getRanking = api.game.getRanking.useQuery();
  const getNotWinnerRankingRaw = api.game.getNotWinnerRankingRaw.useQuery();

  const getContent = () => {
    if (getRanking.isLoading || getNotWinnerRankingRaw.isLoading) {
      return (
        <Stack spacing={4} py={4}>
          <Skeleton height="53px" />
          <Skeleton height="53px" />
          <Skeleton height="53px" />
          <Skeleton height="53px" />
          <Skeleton height="53px" />
        </Stack>
      );
    }
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Player</Th>
              <Th isNumeric>Score</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {
                [
                  ...getRanking.data || [],
                  ...(getNotWinnerRankingRaw.data as [])?.map(({ winner }: { winner: string }) => ({
                    _sum: {
                      delta: 0,
                    },
                    winner,
                  })) || [],
                ]?.map(({ winner, _sum }, index) => (
                  <Tr key={crypto.randomUUID()}>
                    <Td>{`# ${index + 1}`}</Td>
                    <Td>{winner}</Td>
                    <Td isNumeric>
                      <TotalScore playerName={winner || ""} delta={_sum.delta || 0} />
                    </Td>
                    <Td textAlign="end">
                      <NextLink href={`/ranking/history/${encodeURIComponent(winner!)}`}>
                        History
                      </NextLink>
                    </Td>
                  </Tr>
                ))
}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Head>
        <title>Ranking</title>
        <meta name="description" content="Ranking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing={16}>
        <Heading alignSelf="center">Ranking</Heading>
        <Box px={4} borderWidth="1px" borderRadius="lg" alignItems="center" bg="orange.50">
          {getContent()}
        </Box>
      </Stack>
    </>
  );
};

export default Ranking;
