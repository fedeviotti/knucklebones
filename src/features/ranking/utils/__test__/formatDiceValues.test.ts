import { formatDiceValues } from "~/features/ranking/utils/formatDiceValues";

describe("formatDiceValues", () => {
  it("should return the values formatted properly", () => {
    const result = formatDiceValues("0,0,0,0,0,0,0,0,0");
    expect(result).toBe("0,0,0|0,0,0|0,0,0");
  });
});
