import {
  Flex, Stack, useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { DiceBoard } from "~/features/game/components/DiceBoard";
import { PartialScore } from "~/features/game/components/PartialScore";
import { PlayerConsole } from "~/features/game/components/PlayerConsole";
import type { PlayerType } from "~/features/game/types";

type Props = {
  playerType: PlayerType;
};

export const PlayerBoard = ({
  playerType,
}: Props) => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Stack direction={playerType === "player" ? "column-reverse" : "column"} spacing={12} alignItems="center">
        <Flex direction={playerType === "player" ? "column-reverse" : "column"} alignItems="center">
          <PartialScore playerType={playerType} />
          <DiceBoard playerType={playerType} />
        </Flex>
        <PlayerConsole playerType={playerType} />
      </Stack>
    );
  }

  return (
    <Stack
      direction={playerType === "player" ? "row-reverse" : "row"}
      spacing={12}
      justifyContent={playerType === "player" ? "start" : "end"}
    >
      <Flex minWidth={[null, "200px"]} />
      <Flex direction={playerType === "player" ? "column-reverse" : "column"} grow={1}>
        <PartialScore playerType={playerType} />
        <DiceBoard playerType={playerType} />
      </Flex>
      <PlayerConsole playerType={playerType} />
    </Stack>
  );
};
