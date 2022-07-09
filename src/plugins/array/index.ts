import { doc } from "../../model/document/Doc"
import { checkValue, Value } from "../../model/dsl/DSL"
import plugins from "../../plugins"
import { SVGElem } from "../svg/SVGElem"
import { JSX } from "mobx-jsx"

declare global {
  interface ValueTypes {
    array: any[]
  }
}

plugins.register("DSJ_checkValue", (raw) => {
  if (Array.isArray(raw)) {
    raw.forEach((e) => checkValue(e))
    return raw
  }
})

plugins.register("SVG_content", () => {
  return [...doc.objects.values()]
    .map(({ fn }) => fn())
    .filter((o): o is any[] => Array.isArray(o))
    .map(asSVG)
})

function asSVG(o: SVGElem | unknown[]): JSX.Element {
  if (o instanceof SVGElem) return o.asSVG
  return o
    .filter(
      (o): o is any[] | SVGElem => o instanceof SVGElem || Array.isArray(o)
    )
    .map(asSVG)
}
