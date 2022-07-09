import { display } from "../../model/document/Value"
import { parse } from "../../model/dsl/DSL"
import plugins from "../../plugins"
import { app } from "../../ui/App.viewmodel"
import { rebalance } from "../../model/dsl/rebalance"

plugins.register("SVG_content", () => {
  try {
    const commands = parse(rebalance(app.input))
    return commands.map((command) => display(command.fn()))
  } catch (e) {
    return <></>
  }
})
