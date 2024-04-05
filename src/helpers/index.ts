export function getPositionIndexesForGridCell({
  gridCell,
  elementsPerRow,
}: {
  gridCell: number;
  elementsPerRow: number;
}) {
  const rowIndex = Math.ceil(gridCell / elementsPerRow) - 1;
  const colIndex = Math.floor(gridCell % elementsPerRow || elementsPerRow) - 1;
  return [rowIndex, colIndex];
}

export function getGridCellsRange({
  cellIndexes,
  elementsPerRow,
}: {
  cellIndexes: {
    first: number[];
    last: number[];
  };
  elementsPerRow: number;
}) {
  const { first, last } = cellIndexes;

  if (first.length !== 2 || last.length !== 2) {
    throw new Error("Indexes need to be a pair");
  }

  const [iRow, iCol] = first;
  const [jRow, jCol] = last;

  const updatedSelectedGridCells = [] as number[];

  for (let i = Math.min(iRow, jRow); i <= Math.max(iRow, jRow); i++) {
    for (let j = Math.min(iCol, jCol); j <= Math.max(iCol, jCol); j++) {
      const gridCellValue = i * elementsPerRow + j + 1;
      updatedSelectedGridCells.push(gridCellValue);
    }
  }

  return updatedSelectedGridCells;
}
