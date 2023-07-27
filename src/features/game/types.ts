export type PlayerOrder = "player" | "opponent";
export type Player = {
  name: string;
  order: PlayerOrder;
  values: number[];
  valueToPlace: number;
};
