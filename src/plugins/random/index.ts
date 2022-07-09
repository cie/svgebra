import { observable } from "mobx"
import { memorize } from "../../model/dsl/DSL"
import plugins from "../../plugins"

function mulberry32(a: number) {
  return function () {
    var t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let seed = 0
let r = mulberry32(seed)

plugins.register("DSL_function", function random(n = 1) {
  return memorize(() => r()) * n
})
