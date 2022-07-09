import { map } from "mobx-jsx";
import { app } from "./App.viewmodel";

export function App() {
  const inputKeypress = (
    e: KeyboardEvent & { currentTarget: HTMLInputElement }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      app.execute();
    }
  };
  const inputChanged = (
    e: KeyboardEvent & { currentTarget: HTMLInputElement }
  ) => (app.input = e.currentTarget.value);

  return (
    <div class="t1 h-full flex">
      <div class="t1 w-25% bg-c-white br-1-gray">
        <ul class="t1 flex">
          <div class="t1 flex-grow-1 text-right">
            {map(
              () => app.objects,
              ({ value }) => (
                <li class="t1 p-4 bb-1-gray-200">{value}</li>
              )
            )}
          </div>
        </ul>
        <input
          class="t1 w-100% b-1-gray p-3"
          type="text"
          value={app.input}
          autofocus
          on:input={inputChanged}
          on:keypress={inputKeypress}
        />
        {app.error && (
          <div class="t1 p-5 bg-c-red-100 color-red-800">
            {app.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}
