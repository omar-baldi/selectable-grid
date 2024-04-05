/* eslint-disable */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_GRID_ELEMENTS_PER_ROW,
  DEFAULT_TOTAL_AMOUNT_GRID_ELEMENTS,
} from "../constants";
import { getGridCellsRange, getPositionIndexesForGridCell } from "../helpers";

type Props = {
  totalAmountElements?: number;
  elementsPerRow?: number;
};

export default function SelectableGrid({
  totalAmountElements = DEFAULT_TOTAL_AMOUNT_GRID_ELEMENTS,
  elementsPerRow = DEFAULT_GRID_ELEMENTS_PER_ROW,
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isPressing = useRef<boolean>(false);
  const firstGridCell = useRef<number | null>(null);
  const [selectedGridCells, setSelectedGridCells] = useState<number[]>([]);

  useEffect(() => {
    function handleMouseDownEvent(e: MouseEvent) {
      isPressing.current = true;
      document.body.style.cursor = "grabbing";

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
      document.body.style.cursor = "default";
      setSelectedGridCells([]);
    }

    gridRef.current?.addEventListener("mousedown", handleMouseDownEvent);
    gridRef.current?.addEventListener("mouseup", handleMouseUpEvent);

    return function () {
      gridRef.current?.removeEventListener("mousedown", handleMouseDownEvent);
      gridRef.current?.removeEventListener("mouseup", handleMouseUpEvent);
    };
  }, []);

  function handleGridCellMouseEnter(gridCellEntered: number) {
    if (!isPressing.current || typeof firstGridCell.current !== "number") return;

    const firstCellIndexes = getPositionIndexesForGridCell({
      gridCell: firstGridCell.current,
      elementsPerRow,
    });

    const lastCellIndexes = getPositionIndexesForGridCell({
      gridCell: gridCellEntered,
      elementsPerRow,
    });

    const updatedSelectedGridCells = getGridCellsRange({
      cellIndexes: {
        first: firstCellIndexes,
        last: lastCellIndexes,
      },
      elementsPerRow,
    });

    setSelectedGridCells(updatedSelectedGridCells);
  }

  const cells = useMemo(
    () => [...Array(totalAmountElements)].map((_, i) => i + 1),
    [totalAmountElements]
  );

  const gridCells = cells.map((n) => {
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
