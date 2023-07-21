import { Flex } from "@chakra-ui/react";
import React from "react";
import { DiceBoard } from "~/features/game/DiceBoard";
import { PartialScore } from "~/features/game/PartialScore";
import { PlayerInfos } from "~/features/game/PlayerInfos";

type Props = {
  name: string;
  values: number[];
  round: number;
  position?: "left" | "right";
};

export const PlayerDashboard = ({
  name, values, round, position = "left",
}: Props) => (
  <Flex justifyContent="center" alignItems="center">
    <PlayerInfos
      name={name}
      round={round}
      showDetails={position === "left"}
      remainder={1}
    />
    <Flex direction={position === "left" ? "column-reverse" : "column"}>
      <PartialScore values={values} />
      <DiceBoard values={values} name={name} />
    </Flex>
    <PlayerInfos
      name={name}
      round={round}
      showDetails={position === "right"}
      remainder={0}
    />
  </Flex>
);
