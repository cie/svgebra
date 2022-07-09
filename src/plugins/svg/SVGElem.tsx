import { JSX } from "mobx-jsx/jsx-runtime"
import { Obj } from "../../model/document/Obj"
import { G } from "."
import { Color } from "../color/Color"

export abstract class SVGElem extends Obj {
  constructor() {
    super()
  }

  abstract get asSVG(): JSX.Element

  translate(x = 0, y = 0): SVGElem {
    return new G([this], { transform: [{ name: "translate", args: [x, y] }] })
  }

  fill(c: Color): SVGElem {
    return new G([this], { fill: c })
  }
}
