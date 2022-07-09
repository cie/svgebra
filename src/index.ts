import "./plugins/index";
import { App } from "./ui/App.view";

window.addEventListener("DOMContentLoaded", () => {
  document.body.className = "t1-start t1";
  document.body.append(...[App()].flat());
});
