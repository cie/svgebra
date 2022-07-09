import plugins from "../../plugins"
import { doc } from "../document/Doc"
import { Obj } from "../document/Obj"

declare global {
  interface PluginPoints {
    DSL_function: Function
  }
}

export type Command = { type: "add"; name?: string; object: Obj }

declare global {
  interface PluginPoints {
    DSL_preprocess: (s: string) => string
  }
}

function createWritableContext(ctx: object) {
  return new Proxy(Object.create(ctx), {
    has(target, key) {
      return true
    },
    get(target, key) {
      if (key === Symbol.unscopables) return []
      if (!(key in target)) throw new Error(`Undefined variable ${String(key)}`)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      return true
    },
  })
}

export function parse(input: string): Command[] {
  const ctx = createWritableContext(doc.ctx)
  const compiled = new Function(
    "__ctx",
    `with(__ctx){
      return ((((${input}))));
    }`
  )
  const raw = compiled(ctx)
  const newNames = Object.keys(ctx)
  if (!newNames.length) return [{ type: "add", object: toObj(raw) }]
  return newNames.map((name) => ({
    type: "add",
    name,
    object: toObj(ctx[name]),
  }))
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
