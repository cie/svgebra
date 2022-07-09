import plugins from "../../plugins"
import { Circle } from "./Circle"
import { SVGElem } from "./SVGElem"
export { G } from "./G"

plugins.register("DSL_class", Circle)

plugins.register("Value_display", (v) => {
  if (v instanceof SVGElem) return v.asSVG
})
