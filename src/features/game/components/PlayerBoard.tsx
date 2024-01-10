import {
  Flex, Stack, useMediaQuery,
} from "@chakra-ui/react";
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
}: Props) => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Stack direction={playerOrder === "player" ? "column-reverse" : "column"} spacing={12} alignItems="center">
        <Flex direction={playerOrder === "player" ? "column-reverse" : "column"} alignItems="center">
          <PartialScore playerOrder={playerOrder} />
          <DiceBoard playerOrder={playerOrder} />
        </Flex>
        <PlayerConsole playerOrder={playerOrder} />
      </Stack>
    );
  }

  return (
    <Stack
      direction={playerOrder === "player" ? "row-reverse" : "row"}
      spacing={12}
      justifyContent={playerOrder === "player" ? "start" : "end"}
    >
      <Flex minWidth={[null, "200px"]} />
      <Flex direction={playerOrder === "player" ? "column-reverse" : "column"} grow={1}>
        <PartialScore playerOrder={playerOrder} />
        <DiceBoard playerOrder={playerOrder} />
      </Flex>
      <PlayerConsole playerOrder={playerOrder} />
    </Stack>
  );
};
