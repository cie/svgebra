import { JSX } from "mobx-jsx/jsx-runtime"
import { Color } from "../color/Color"
import { SVGElem } from "./SVGElem"

type Transform = "translate" | "scale" | "rotate"
export interface Props {
  transform?: { name: Transform; args: number[] }[]
  fill?: Color
}

declare module "mobx-jsx" {
  namespace JSX {
    interface GSVGAttributes<T> extends PresentationSVGAttributes {}
  }
}

export class G extends SVGElem {
  constructor(public elems: SVGElem[], public props: Props) {
    super()
  }

  get asSVG(): JSX.Element {
    return (
      <g
        transform={this.props.transform
          ?.map(({ name, args }) => `${name}(${args.join(",")})`)
          .join("")}
        fill={this.props.fill?.asString}
      >
        {this.elems.map((elem) => elem.asSVG)}
      </g>
    )
  }

  get asString(): string {
    if (this.elems.length === 1) {
      return `${this.elems[0].asString}`
    }
    return `G([${this.elems.map((e) => e.asString).join(", ")}])`
  }
}
