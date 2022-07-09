import { Obj } from "./Obj"
import { JSX } from "mobx-jsx"
import plugins from "../../plugins"

export type Value = ValueTypes[keyof ValueTypes]
export type SVG = JSX.Element

declare global {
  interface ValueTypes {
    object: Obj
  }
  interface PluginPoints {
    Value_display: (v: Value) => SVG | undefined
  }
}

export function display(v: Value): SVG {
  return plugins("Value_display")
    .map((fn) => fn(v))
    .filter(Boolean)
}
