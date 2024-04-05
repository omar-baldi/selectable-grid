/* eslint-disable */
import { useEffect, useRef, useState } from "react";

const defaultTotalAmountElements = 150;
const defaultElementsPerRow = 15;

type Props = {
  totalAmountElements?: number;
  elementsPerRow?: number;
};

export default function SelectableGrid({
  totalAmountElements = defaultTotalAmountElements,
  elementsPerRow = defaultElementsPerRow,
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isPressing = useRef<boolean>(false);
  const firstGridCell = useRef<number | null>(null);
  const [selectedGridCells, setSelectedGridCells] = useState<number[]>([]);

  useEffect(() => {
    function handleMouseDownEvent(e: MouseEvent) {
      isPressing.current = true;

      if (e.target instanceof HTMLElement) {
        const gridCell = e.target.innerText;
        const isGridCellValid = !isNaN(+gridCell);

        if (isGridCellValid) {
          firstGridCell.current = +gridCell;
          setSelectedGridCells([firstGridCell.current]);
        }
      }
    }

    function handleMouseUpEvent() {
      isPressing.current = false;
      setSelectedGridCells([]);
    }

    gridRef.current?.addEventListener("mousedown", handleMouseDownEvent);
    gridRef.current?.addEventListener("mouseup", handleMouseUpEvent);

    return function () {
      gridRef.current?.removeEventListener("mousedown", handleMouseDownEvent);
      gridRef.current?.removeEventListener("mouseup", handleMouseUpEvent);
    };
  }, []);

  function getPositionIndexesForGridCell(gridCell: number) {
    const rowIndex = Math.ceil(gridCell / elementsPerRow) - 1;
    const colIndex = Math.floor(gridCell % elementsPerRow || elementsPerRow) - 1;
    return [rowIndex, colIndex];
  }

  function handleGridCellMouseEnter(gridCell: number) {
    if (!isPressing.current || typeof firstGridCell.current !== "number") return;

    const [iRow, iCol] = getPositionIndexesForGridCell(firstGridCell.current);
    const [jRow, jCol] = getPositionIndexesForGridCell(gridCell);

    const updatedSelectedGridCells = [] as number[];

    for (let i = Math.min(iRow, jRow); i <= Math.max(iRow, jRow); i++) {
      for (let j = Math.min(iCol, jCol); j <= Math.max(iCol, jCol); j++) {
        const gridCellValue = i * elementsPerRow + j + 1;
        updatedSelectedGridCells.push(gridCellValue);
      }
    }

    setSelectedGridCells(updatedSelectedGridCells);
  }

  const gridCells = [...Array(totalAmountElements)]
    .map((_, i) => i + 1)
    .map((n) => {
      const isSelected = selectedGridCells.includes(n);

      return (
        <div
          key={n}
          onMouseEnter={() => handleGridCellMouseEnter(n)}
          style={{
            height: "50px",
            width: "50px",
            border: "1px solid grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isSelected ? "lightblue" : "initial",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{n}</span>
        </div>
      );
    });

  return (
    <div
      ref={gridRef}
      style={{ display: "grid", gridTemplateColumns: `repeat(${elementsPerRow},1fr)` }}
    >
      {gridCells}
    </div>
  );
}
