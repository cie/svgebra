import { Num } from "../../plugins/Num/Num"
import { doc } from "../document/Doc"
import { parse } from "./DSL"
import "../../plugins/index"

function _(cmds: string) {
  cmds.split("\n").forEach((line) => doc.executeCommand(...parse(line)))
}

describe("names", () => {
  beforeEach(() => {
    doc.clear()
  })
  it("automatically given", () => {
    _(`4`)
    expect(doc.objects.get("a")?.fn()).toEqual(new Num(4))
  })
  it("can be reused", () => {
    _(`4
       a*2`)
    expect(doc.objects.get("b")?.fn()).toEqual(new Num(8))
  })
  it("can be explicitly given", () => {
    _(`x = 3`)
    expect(doc.objects.get("x")?.fn()).toEqual(new Num(3))
  })
})
