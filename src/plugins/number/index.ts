import plugins from "../../plugins"

declare global {
  interface ValueTypes {
    number: number
  }
}

plugins.register("DSJ_checkValue", (raw) => {
  if (typeof raw === "number") return raw
})
