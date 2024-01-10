import { calculatePartialScore } from "~/features/game/utils/calculatePartialScore";

describe("calculatePartialScore", () => {
  it("should return the correct partial score", () => {
    const result = calculatePartialScore({ values: [1, 2, 3, 1, 2, 3, 1, 2, 3] });
    expect(result).toStrictEqual({
      column1Score: 9,
      column2Score: 18,
      column3Score: 27,
    });
  });
});
