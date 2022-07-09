import plugins from "../../plugins"

declare global {
  interface PluginPoints {
    DSL_class: { new (...args: any[]): any }
    DSL_function: Function
    DSL_variable: () => any
  }
}

export function globalContext() {
  const ctx = {} as { [name: string]: any }
  for (const cls of plugins("DSL_class"))
    ctx[cls.name] = (...args: any[]) => new cls(...args)
  for (const fun of plugins("DSL_function")) ctx[fun.name] = fun
  for (const varFn of plugins("DSL_variable"))
    Object.defineProperty(ctx, varFn.name, { get: varFn })
  return ctx
}
