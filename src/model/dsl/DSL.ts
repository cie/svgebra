import plugins from "../../plugins"
import { doc } from "../document/Doc"
import { Obj } from "../document/Obj"

declare global {
  interface PluginPoints {
    DSL_function: Function
  }
}

export type Command = {
  type: "add"
  name?: string
  fn: () => Obj
  expr: string
}

declare global {
  interface PluginPoints {
    DSL_preprocess: (s: string) => string
  }
}

export function parse(expr: string): Command[] {
  const assignment = expr.match(/^\s*([a-z$_][0-9a-z$_]*)\s*=(?!>)/i)
  let name: string | undefined = undefined
  if (assignment) {
    expr = expr.slice(assignment[0].length)
    name = assignment[1]
  }
  const compiled = new Function(
    "__ctx",
    `with(__ctx){
      return ((((${expr}))));
    }`
  )
  // try to evaluate
  toObj(compiled(doc.ctx))
  return [{ type: "add", name, expr, fn: () => toObj(compiled(doc.ctx)) }]
}

declare global {
  interface PluginPoints {
    DSL_toObj: (raw: any) => Obj | undefined
  }
}

function toObj(raw: any) {
  if (raw instanceof Obj) return raw
  for (const converter of plugins("DSL_toObj")) {
    const r = converter(raw)
    if (r) return r
  }
  throw new Error(`Unsupported value type: ${raw}`)
}
