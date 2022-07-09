import { makeAutoObservable } from "mobx"
import { doc } from "../model/document/Doc"
import { parse } from "../model/dsl/DSL"

export class App {
  input = ""
  error: Error | null = null

  constructor() {
    makeAutoObservable(this)
  }

  execute() {
    try {
      doc.execute(...parse(this.input))
      this.error = null
      this.input = ""
    } catch (e) {
      if (e instanceof Error) this.error = e
      else this.error = new Error(`${e}`)
    }
  }

  get objects() {
    return [...doc.objects.entries()].map(([name, fn]) => ({
      name,
      value: fn().commandLine,
    }))
  }
}
export const app = new App()
;(globalThis as any).app = app
