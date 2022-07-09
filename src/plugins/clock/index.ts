import { observable } from "mobx"
import { Obj } from "../../model/document/Obj"
import plugins from "../../plugins"

const clock = observable({
  start: Date.now(),
  millis: 0,
  dt: 0,
})

requestAnimationFrame(tick)

let last = Date.now()
function tick() {
  const now = Date.now()
  clock.millis = now - clock.start
  clock.dt = (now - last) / 1000
  last = now
  requestAnimationFrame(tick)
}

plugins.register("SVG_restart", () => (clock.start = Date.now()))

plugins.register("DSL_variable", function t() {
  return clock.millis / 1000
})
plugins.register("DSL_variable", function dt() {
  return clock.dt
})
