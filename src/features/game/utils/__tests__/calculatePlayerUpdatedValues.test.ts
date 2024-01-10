import { calculatePlayerUpdatedValues } from "~/features/game/utils/calculatePlayerUpdatedValues";

describe("calculatePlayerUpdatedValues", () => {
  it("should return the correct player updated values", () => {
    const result = calculatePlayerUpdatedValues({
      values: [1, 2, 3, 0, 0, 0, 1, 2, 3],
      valueToInsert: 1,
      position: 3,
    });
    expect(result).toStrictEqual([1, 2, 3, 1, 0, 0, 1, 2, 3]);
  });
});
