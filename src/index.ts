import { App } from "./ui/App.view";

window.addEventListener("DOMContentLoaded", () => {
  document.body.append(...[App()].flat());
});
