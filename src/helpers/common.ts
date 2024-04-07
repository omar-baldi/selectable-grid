export function isTargetHtmlElement(el: unknown): el is HTMLDivElement {
  return el instanceof HTMLDivElement;
}
