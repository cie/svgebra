import { computed, makeAutoObservable } from "mobx"
import plugins from "../../plugins"
import { Command, parse } from "../dsl/DSL"
import { globalContext } from "../dsl/globals"
import { Value } from "./Value"

const letters = "abcdefghijklmnopqrstuvwxyz"

export class Doc {
  objects = new Map<string, { expr: string; fn: () => Value }>()
  behaviors = [] as (() => void)[]
  commands: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  clear() {
    this.commands = []
    this.objects.clear()
  }

  load(s: string) {
    this.clear()
    s.split("\n").forEach((line) => this.execute(line))
    this.restart()
  }

  restart() {
    plugins("Doc_restart").forEach((fn) => fn())
  }

  execute(line: string) {
    this.commands.push(line)
    this.executeCommand(...parse(line))
  }

  get commandsFile() {
    return this.commands.join("\n")
  }

  private executeCommand(...commands: Command[]) {
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
    const objs = Object.create(globalContext())
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
