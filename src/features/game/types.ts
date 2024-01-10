export type PlayerType = "player" | "opponent";
export type Player = {
  name: string;
  order: PlayerType;
  values: number[];
  valueToPlace: number;
};
