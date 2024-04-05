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
  const firstGridCellPressed = useRef<number | null>(null);
  const [selectedGridCells, setSelectedGridCells] = useState<number[]>([]);

  useEffect(() => {
    function handleMouseDownEvent(e: MouseEvent) {
      isPressing.current = true;

      if (e.target instanceof HTMLElement) {
        const gridCell = e.target.innerText;
        const isGridCellValid = !isNaN(+gridCell);

        if (isGridCellValid) {
          firstGridCellPressed.current = +gridCell;
          setSelectedGridCells([firstGridCellPressed.current]);
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

  const gridCells = [...Array(totalAmountElements)]
    .map((_, i) => i + 1)
    .map((n) => {
      const isSelected = selectedGridCells.includes(n);

      return (
        <div
          key={n}
          data-grid-cell={n}
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
