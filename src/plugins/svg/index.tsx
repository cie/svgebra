import { makeObservable, observable } from "mobx"
import { doc } from "../../model/document/Doc"
import plugins from "../../plugins"
import { SVGElem } from "./SVGElem"
import { Circle as SVGCircle } from "./Circle"
export { G } from "./G"

import * as thisModule from "./index"

plugins.register(
  "DSL_function",
  function Circle(center: [number, number], r: number) {
    return new SVGCircle(center, r)
  }
)

plugins.register("SVG_content", () => {
  return [...doc.objects.values()]
    .map(({ fn }) => fn())
    .filter((o): o is SVGElem => o instanceof SVGElem)
    .map((o) => o.asSVG)
})
