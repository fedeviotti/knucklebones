export type PlayerType = "player" | "opponent";
export type Player = {
  name: string;
  type: PlayerType;
  values: number[];
  valueToInsert: number;
};
