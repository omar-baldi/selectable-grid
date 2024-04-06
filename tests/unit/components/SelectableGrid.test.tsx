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
});
