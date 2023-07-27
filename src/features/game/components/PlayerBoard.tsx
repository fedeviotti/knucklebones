import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { DiceBoard } from "~/features/game/components/DiceBoard";
import { PartialScore } from "~/features/game/components/PartialScore";
import { PlayerConsole } from "~/features/game/components/PlayerConsole";
import type { PlayerOrder } from "~/features/game/types";

type Props = {
  playerOrder: PlayerOrder;
};

export const PlayerBoard = ({
  playerOrder,
}: Props) => (
  <Stack direction={playerOrder === "player" ? "row-reverse" : "row"} spacing={12} width="900px">
    <Box width="400px" />
    <Flex direction={playerOrder === "player" ? "column-reverse" : "column"} width="300px">
      <PartialScore playerOrder={playerOrder} />
      <DiceBoard playerOrder={playerOrder} />
    </Flex>
    <PlayerConsole
      playerOrder={playerOrder}
    />
  </Stack>
);
