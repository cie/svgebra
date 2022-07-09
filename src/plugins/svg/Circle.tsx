import { JSX } from "mobx-jsx/jsx-runtime"
import { SVGElem } from "./SVGElem"

export class Circle extends SVGElem {
  center: [number, number]
  r: number
  constructor(r?: number, center?: [number, number]) {
    super()
    this.r = r ?? 50
    this.center = center ?? [0, 0]
  }

  get asString(): string {
    return `Circle(${this.r}, [${this.center[0]}, ${this.center[1]}])`
  }

  get asSVG(): JSX.Element {
    return <circle cx={this.center[0]} cy={this.center[1]} r={this.r} />
  }
}
