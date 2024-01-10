import { calculateTotalScore } from "~/features/game/utils/calculateTotalScore";

describe("calculateTotalScore", () => {
  it("should return the correct total score", () => {
    const result = calculateTotalScore({ values: [1, 2, 3, 1, 2, 3, 1, 2, 3] });
    expect(result).toBe(54);
  });
});
