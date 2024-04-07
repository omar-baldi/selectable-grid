import { isTargetHtmlElement } from "../../../src/helpers/common";

describe("isTargetHtmlElement", () => {
  it("should return true if target is an html element", () => {
    const el = document.createElement("div");
    const isHtml = isTargetHtmlElement(el);
    expect(isHtml).toBe(true);
  });

  it("should return false if target is not an html element", () => {
    const el = "Something here";
    const isHtml = isTargetHtmlElement(el);
    expect(isHtml).toBe(false);
  });
});
