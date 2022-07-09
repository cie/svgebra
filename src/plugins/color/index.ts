import plugins from "../../plugins";
import { Color } from "./Color";

plugins.register("DSL_function", function rgb(r: number, g: number, b: number) {
  return new Color(r, g, b);
});
