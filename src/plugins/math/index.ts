import plugins from "../../plugins"

for (const key of Object.keys(Object.getOwnPropertyDescriptors(Math))) {
  const fn = Math[key as keyof Math]
  if (fn instanceof Function) plugins.register("DSL_function", fn)
}

plugins.register("DSL_function", function range(n: number) {
  return [...Array(n)].map((_, i) => i)
})
plugins.register("DSL_variable", function pi() {
  return Math.PI
})
plugins.register("DSL_variable", function turn() {
  return 2 * Math.PI
})
plugins.register("DSL_variable", function deg() {
  return Math.PI / 180
})
plugins.register("DSL_variable", function e() {
  return Math.E
})
plugins.register("DSL_function", function ln(x: number) {
  return Math.log(x)
})
