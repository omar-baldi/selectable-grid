import { getPositionIndexesForGridCell } from "../../../src/helpers/grid-cell";

describe("getPositionIndexesForGridCell", () => {
  it.each([
    [41, { expectedIndexRow: 2, expectedIndexCol: 10 }],
    [116, { expectedIndexRow: 7, expectedIndexCol: 10 }],
    [77, { expectedIndexRow: 5, expectedIndexCol: 1 }],
  ])(
    "should return correct indexes for grid cell %d",
    (gridCell, { expectedIndexRow, expectedIndexCol }) => {
      const [indexRow, indexCol] = getPositionIndexesForGridCell({
        gridCell,
        elementsPerRow: 15,
      });

      expect(indexRow).toBe(expectedIndexRow);
      expect(indexCol).toBe(expectedIndexCol);
    }
  );
});
