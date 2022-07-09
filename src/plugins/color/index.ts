import plugins from "../../plugins"
import { Color } from "./Color"

plugins.register("DSL_function", function rgb(r: number, g: number, b: number) {
  return new Color(r, g, b)
})

plugins.register("DSL_preprocess", (s) =>
  s.replace(
    /(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*\1?|#([0-9a-f]{3,8})\b/gi,
    (it, _, hex: string) => {
      if (hex) {
        if (hex.length === 3)
          return `rgb(${[
            Number.parseInt(hex.slice(0, 1), 16) * 17,
            Number.parseInt(hex.slice(1, 2), 16) * 17,
            Number.parseInt(hex.slice(2, 3), 16) * 17,
          ].join(", ")})`
        if (hex.length === 6)
          return `rgb(${[
            Number.parseInt(hex.slice(0, 2), 16),
            Number.parseInt(hex.slice(2, 4), 16),
            Number.parseInt(hex.slice(4, 6), 16),
          ].join(", ")})`
      }
      return it
    }
  )
)
