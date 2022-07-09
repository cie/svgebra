import { action } from "mobx"
import { map, JSX } from "mobx-jsx"
import plugins from "../plugins"
import { app } from "./App.viewmodel"

declare global {
  interface PluginPoints {
    SVG_content: JSX.Element
  }
}

export function App() {
  const inputKeypress = (
    e: KeyboardEvent & { currentTarget: HTMLInputElement }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      app.execute()
    }
  }
  const inputChanged = action(
    (e: InputEvent & { currentTarget: HTMLInputElement }) =>
      (app.input = e.currentTarget.value)
  )

  return (
    <div class="t1 h-full flex">
      <div class="t1 w-25% bg-c-white br-1-gray">
        <ul class="t1">
          {map(
            () => app.objects,
            ({ name, expr, value }) => (
              <li class="t1 p-4 bb-1-gray-200 flex">
                <div>{name} =</div>
                {expr && <div>&nbsp;{expr} = </div>}
                <div class="t1 flex-grow-1 text-right">{value}</div>
              </li>
            )
          )}
        </ul>
        <input
          class="t1 w-100% b-1-gray p-3"
          type="text"
          value={app.input}
          autofocus
          onInput={inputChanged}
          onKeyPress={inputKeypress}
        />
        {app.error && (
          <div class="t1 p-5 bg-c-red-100 color-red-800">
            {app.error?.message}
          </div>
        )}
      </div>
      <div class="t1 flex-1">
        <svg class="t1 w-100% h-100%">{plugins("SVG_content")}</svg>
      </div>
    </div>
  )
}
