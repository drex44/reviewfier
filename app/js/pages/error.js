import { showPage } from "./pageUtils";

export function renderErrorPage() {
  window.location.hash = "error";
  showPage("error");
}
