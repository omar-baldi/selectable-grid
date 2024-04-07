import {
  getGridCellsRange,
  getPositionIndexesForGridCell,
} from "../../../src/helpers/grid-cell";

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

describe("getGridCellsRange", () => {
  it("should throw error if cell indexes are not a pair array", () => {
    expect(() => {
      getGridCellsRange({
        cellIndexes: {
          first: [1],
          last: [10, 2],
        },
        elementsPerRow: 15,
      });
    }).toThrow(new Error("Indexes need to be a pair"));
  });

  it.each([
    [
      {
        first: [2, 9],
        last: [4, 9],
        expectedGridCellsRange: [40, 55, 70],
      },
    ],
    [
      {
        first: [1, 3],
        last: [3, 6],
        expectedGridCellsRange: [19, 20, 21, 22, 34, 35, 36, 37, 49, 50, 51, 52],
      },
    ],
  ])(
    "should return correct grid cells range",
    ({ first, last, expectedGridCellsRange }) => {
      const gridCellsRange = getGridCellsRange({
        cellIndexes: { first, last },
        elementsPerRow: 15,
      });

      expect(gridCellsRange).toEqual(expectedGridCellsRange);
    }
  );
});
