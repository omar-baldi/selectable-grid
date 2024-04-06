import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SelectableGrid from "../../../src/components/SelectableGrid";

describe("SelectableGrid", () => {
  it("should render default amount of grid cells if no prop is specified", async () => {
    const wrapper = render(<SelectableGrid />);
    const gridCellsElements = await wrapper.findAllByTestId("grid-cell", {
      exact: false,
    });
    expect(gridCellsElements.length).toBe(150);
  });
});
