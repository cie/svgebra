import { makeAutoObservable } from "mobx"
import plugins from "../../plugins"
import { Command } from "../dsl/DSL"
import { Obj } from "./Obj"

const letters = "abcdefghijklmnopqrstuvwxyz"

export class Doc {
  objects = new Map<string, Obj>()

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
        this.objects.set(name, command.object)
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
    const objs = Object.create(funs)
    for (const [name, obj] of this.objects.entries()) objs[name] = obj
    return objs
  }
}
export let doc = new Doc()
;(globalThis as any).doc = doc
