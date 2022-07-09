import { makeObservable, observable } from "mobx"
import { JSX } from "mobx-jsx/jsx-runtime"
import { doc } from "../../model/document/Doc"
import { Obj } from "../../model/document/Obj"
import plugins from "../../plugins"

abstract class SVGElem extends Obj {
  constructor() {
    super()
  }

  abstract get asSVG(): JSX.Element
}

export class Circle extends SVGElem {
  constructor(public center: [number, number], public r: number) {
    super()
  }

  get asString(): string {
    return `Circle([${this.center[0]}, ${this.center[1]}], ${this.r})`
  }

  get asSVG(): JSX.Element {
    return <circle cx={this.center[0]} cy={this.center[1]} r={this.r} />
  }
}
import * as thisModule from "./index"

plugins.register(
  "DSL_function",
  function Circle(center: [number, number], r: number) {
    return new thisModule.Circle(center, r)
  }
)

plugins.register("SVG_content", () => {
  return [...doc.objects.values()]
    .map(({ fn }) => fn())
    .filter((o): o is SVGElem => o instanceof SVGElem)
    .map((o) => o.asSVG)
})
