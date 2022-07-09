import { computed, makeAutoObservable, observable } from "mobx"
import plugins from "../../plugins"
import { Command } from "../dsl/DSL"
import { Obj } from "./Obj"

const letters = "abcdefghijklmnopqrstuvwxyz"

export class Doc {
  objects = new Map<string, { expr: string; fn: () => Obj }>()
  behaviors = [] as (() => void)[]

  constructor() {
    makeAutoObservable(this)
  }

  clear() {
    this.objects.clear()
  }

  execute(...commands: Command[]) {
    for (const command of commands)
      if (command.type === "add") {
        const name = command.name ?? this.emptyName()
        const c = computed(command.fn)
        this.objects.set(name, { expr: command.expr, fn: () => c.get() })
      }
  }

  emptyName() {
    for (const letter of letters.split(""))
      if (!this.objects.has(letter)) return letter
    for (let i = 1; ; ++i) if (!this.objects.has(`a${i}`)) return `a${i}`
  }

  get ctx() {
    const funs = {} as { [name: string]: Function }
    for (const fun of plugins("DSL_function")) funs[fun.name] = fun
    const vars = Object.create(funs)
    for (const varFn of plugins("DSL_variable"))
      Object.defineProperty(vars, varFn.name, { get: varFn })
    const objs = Object.create(vars)
    for (const [name, { fn }] of this.objects.entries())
      Object.defineProperty(objs, name, {
        get() {
          return fn()
        },
      })
    return objs
  }
}
export let doc = new Doc()
;(globalThis as any).doc = doc

declare var module: any
if (module.hot) {
  module.hot.dispose((data: any) => {
    data.objects = doc.objects
  })
  module.hot.accept(() => {
    doc.objects = module.hot.data.objects
  })
}
