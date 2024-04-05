/* eslint-disable */

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
  const gridCells = [...Array(totalAmountElements)]
    .map((_, i) => i + 1)
    .map((n) => {
      return (
        <div
          key={n}
          style={{
            height: "50px",
            width: "50px",
            border: "1px solid grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{n}</span>
        </div>
      );
    });

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${elementsPerRow},1fr)` }}
    >
      {gridCells}
    </div>
  );
}
