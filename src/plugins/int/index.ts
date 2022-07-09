import { memorize } from "../../model/dsl/DSL"
import plugins from "../../plugins"

plugins.register("DSL_function", function int(dx: number) {
  const mem = memorize(() => ({ x: 0 }))
  return (mem.x += dx)
})
