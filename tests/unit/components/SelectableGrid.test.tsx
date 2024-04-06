import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SelectableGrid from "../../../src/components/SelectableGrid";

describe("SelectableGrid", () => {
  it("should render default amount of grid cells if no prop is specified", async () => {
    const wrapper = render(<SelectableGrid />);
    const gridCellsElements = await wrapper.findAllByTestId("grid-cell", {
      exact: false,
    });
    expect(gridCellsElements.length).toBe(150);
  });

  it("should select grid cell when being pressed", () => {
    const wrapper = render(<SelectableGrid />);
    const gridCellElement = wrapper.getByTestId("grid-cell grid-cell-49", {
      exact: true,
    });

    expect(gridCellElement).toBeInTheDocument();
    expect(gridCellElement).toHaveStyle({ backgroundColor: "initial" });
    fireEvent.mouseDown(gridCellElement);
    expect(gridCellElement).toHaveStyle({ backgroundColor: "lightblue" });
  });

  it("should not select grid cell when no grid cell has been pressed before entering", () => {
    const wrapper = render(<SelectableGrid />);
    const gridCellElement = wrapper.getByTestId("grid-cell grid-cell-49", {
      exact: true,
    });

    expect(gridCellElement).toHaveStyle({ backgroundColor: "initial" });
    fireEvent.mouseEnter(gridCellElement);
    expect(gridCellElement).toHaveStyle({ backgroundColor: "initial" });
  });

  it("should select grid cells when dragging from a previously pressed cell to another", () => {
    const wrapper = render(<SelectableGrid />);
    const startGridCellElement = wrapper.getByTestId("grid-cell grid-cell-49", {
      exact: true,
    });

    const endGridCellElement = wrapper.getByTestId("grid-cell grid-cell-82", {
      exact: true,
    });

    fireEvent.mouseDown(startGridCellElement);
    fireEvent.mouseEnter(endGridCellElement);

    const expectedSelectedGridCells = [49, 50, 51, 52, 64, 65, 66, 67, 79, 80, 81, 82];
    for (const expectedSelectedGridCell of expectedSelectedGridCells) {
      const gridCellElement = wrapper.getByTestId(
        `grid-cell grid-cell-${expectedSelectedGridCell}`,
        { exact: true }
      );

      expect(gridCellElement).toBeInTheDocument();
      expect(gridCellElement).toHaveStyle({ backgroundColor: "lightblue" });
    }
  });
});
