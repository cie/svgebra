import { makeAutoObservable } from "mobx"
import { doc } from "../model/document/Doc"
import { display, SVG } from "../model/document/Value"
import plugins from "../plugins"
import FileAccess from "./FileAccess"

declare global {
  interface PluginPoints {
    Doc_restart: () => void
  }
}

export class App {
  input = ""
  error: Error | null = null

  constructor() {
    makeAutoObservable(this)
  }

  execute() {
    try {
      doc.execute(this.input)
      this.error = null
      this.input = ""
    } catch (e) {
      if (e instanceof Error) this.error = e
      else this.error = new Error(`${e}`)
    }
  }

  restart() {
    doc.restart()
  }

  get objects() {
    return [...doc.objects.entries()].map(([name, { expr, fn }]) => {
      const value = fn().toString()
      return {
        name,
        expr: same(expr, value) ? undefined : expr,
        value,
      }
    })
  }

  async open() {
    doc.load(await FileAccess.open())
  }

  async save() {
    await FileAccess.save(doc.commandsFile)
  }

  get displayObjects(): SVG {
    return [...doc.objects.values()].map(({ fn }) => display(fn()))
  }

  get svgContent(): SVG {
    return [plugins("SVG_content"), this.displayObjects]
  }
}
export const app = new App()
;(globalThis as any).app = app

function same(s: string, s2: string) {
  return s.replace(/\s*/g, "") === s2.replace(/\s*/g, "")
}
