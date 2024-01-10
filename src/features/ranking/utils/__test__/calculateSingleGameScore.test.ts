import { calculateSingleGameScore } from "~/features/ranking/utils/calculateSingleGameScore";

describe("calculateSingleGameScore", () => {
  it("should return the correct game score, when Teo wins a game with a delta of 10 points", () => {
    const result = calculateSingleGameScore({
      delta: 10,
      winner: "Teo",
      playerName: "Teo",
    });
    expect(result).toBe(110);
  });
  it("should return the correct game score, when Teo lose a game", () => {
    const result = calculateSingleGameScore({
      delta: 0,
      winner: "Noa",
      playerName: "Teo",
    });
    expect(result).toBe(10);
  });
});
