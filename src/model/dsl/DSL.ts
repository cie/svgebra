import plugins from "../../plugins"
import { DefaultsMap } from "../../utils/DefaultsMap"
import { doc } from "../document/Doc"
import { Obj } from "../document/Obj"

declare global {
  interface PluginPoints {
    DSL_function: Function
    DSL_variable: () => any
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

let currentMemoryKey: Symbol
let currentMemoryIndex = 0
const memory = new DefaultsMap<Symbol, unknown[]>(() => [])

plugins.register("Doc_restart", () => memory.clear())

export function memorize<A>(factory: () => A) {
  const currentMemory = memory.get(currentMemoryKey)
  return (currentMemory[currentMemoryIndex++] ??= factory()) as A
}

export function parse(expr: string): Command[] {
  for (const preprocessor of plugins("DSL_preprocess"))
    expr = preprocessor(expr)
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
  currentMemoryKey = Symbol()
  currentMemoryIndex = 0
  toObj(compiled(doc.ctx))

  let memoryForThisLine = Symbol()
  return [
    {
      type: "add",
      name,
      expr,
      fn: () => {
        currentMemoryKey = memoryForThisLine
        currentMemoryIndex = 0
        return toObj(compiled(doc.ctx))
      },
    },
  ]
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
