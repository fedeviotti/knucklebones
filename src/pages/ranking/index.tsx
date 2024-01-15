/* eslint-disable no-underscore-dangle */
import {
  Heading, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
  Skeleton, Box,
} from "@chakra-ui/react";
import * as React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import NextLink from "next/link";

type RankingInfo = {
  winner: string;
  _sum: {
    delta: number;
  };
};

type LoserInfo = {
  winner: string;
  delta: bigint;
};

const Ranking = () => {
  const {
    isFetching: areWinnersFetching,
    data: winners,
  } = api.game.getRanking.useQuery(undefined, { refetchOnWindowFocus: false });
  const {
    isFetching: areLosersFetching,
    data: losers,
  } = api.game.getNotWinnerRankingRaw.useQuery(undefined, { refetchOnWindowFocus: false });

  const isDataFetching = areWinnersFetching || areLosersFetching;

  const fullRanking: RankingInfo[] = React.useMemo(
    () => {
      if (isDataFetching) {
        return [];
      }
      return ([
        ...winners?.map((e) => ({
          ...e,
          _sum: {
            delta: (e._sum.delta || 0) + e._count.winner,
          },
        })) as RankingInfo[],
        ...(losers as LoserInfo[])?.map(({ winner, delta }) => ({
          _sum: {
            delta: Number(delta),
          },
          winner,
        })) as RankingInfo[],
      ].reduce((acc, element) => {
        const found = acc.find((e) => e.winner === element.winner);
        if (found) {
          return [
            ...acc.filter((e) => e.winner !== element.winner),
            {
              winner: element.winner,
              _sum: {
                delta: found._sum.delta + (element._sum.delta || 0),
              },
            },
          ];
        }
        return [...acc, element];
      }, [] as RankingInfo[])
        .sort((a, b) => b._sum.delta - a._sum.delta));
    },
    [isDataFetching, winners, losers],
  );

  const getContent = () => {
    if (isDataFetching) {
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
              fullRanking.map(({ winner, _sum }, index) => (
                <Tr key={crypto.randomUUID()}>
                  <Td>{`# ${index + 1}`}</Td>
                  <Td>{winner}</Td>
                  <Td isNumeric>
                    {_sum.delta * 10}
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
        <Box
          px={4}
          borderWidth="1px"
          borderRadius="lg"
          alignItems="center"
          bg="orange.50"
          opacity="0.95"
          overflow="auto"
          height={["lg", "2xl"]}
        >
          {getContent()}
        </Box>
      </Stack>
    </>
  );
};

export default Ranking;
