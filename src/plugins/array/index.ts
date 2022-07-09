import { display } from "../../model/document/Value"
import { checkValue } from "../../model/dsl/DSL"
import plugins from "../../plugins"

declare global {
  interface ValueTypes {
    array: any[]
  }
}

plugins.register("DSL_checkValue", (raw) => {
  if (Array.isArray(raw)) {
    raw.forEach((e) => checkValue(e))
    return raw
  }
})

plugins.register("Value_display", (v) => {
  if (Array.isArray(v)) return v.map((e) => display(e))
})
