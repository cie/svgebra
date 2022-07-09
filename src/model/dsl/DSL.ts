import plugins from "../../plugins"
import { doc } from "../document/Doc"
import { Obj } from "../document/Obj"

declare global {
  interface PluginPoints {
    DSL_function: Function
  }
}

export type Command = { type: "add"; name?: string; fn: () => Obj }

declare global {
  interface PluginPoints {
    DSL_preprocess: (s: string) => string
  }
}

export function parse(input: string): Command[] {
  const assignment = input.match(/^\s*([a-z$_][0-9a-z$_]*)\s*=(?!>)/i)
  let name: string | undefined = undefined
  if (assignment) {
    input = input.slice(assignment[0].length)
    name = assignment[1]
  }
  const compiled = new Function(
    "__ctx",
    `with(__ctx){
      return ((((${input}))));
    }`
  )
  return [{ type: "add", name, fn: () => toObj(compiled(doc.ctx)) }]
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
