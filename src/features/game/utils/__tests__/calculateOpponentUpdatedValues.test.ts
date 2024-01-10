import { calculateOpponentUpdatedValues } from "~/features/game/utils/calculateOpponentUpdatedValues";

describe("calculateOpponentUpdatedValues", () => {
  it("should return the correct opponent updated values", () => {
    const result = calculateOpponentUpdatedValues({
      values: [1, 2, 3, 0, 0, 0, 1, 2, 3],
      valueToInsert: 1,
      position: 3,
    });
    expect(result).toStrictEqual([0, 2, 3, 0, 0, 0, 0, 2, 3]);
  });
});
