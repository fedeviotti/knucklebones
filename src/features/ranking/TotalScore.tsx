import * as React from "react";
import { Text } from "@chakra-ui/react";
import { calculateTotalPlayerScore } from "~/features/ranking/utils/calculateTotalPlayerScore";

type Props = {
  delta: number;
};
export const TotalScore = ({ delta }: Props) => (
  <Text>{calculateTotalPlayerScore({ delta })}</Text>
);
