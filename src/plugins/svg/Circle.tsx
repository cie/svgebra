import { JSX } from "mobx-jsx/jsx-runtime"
import { SVGElem } from "./SVGElem"

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
