import plugins from "../../plugins";
import { Num } from "./Num";

plugins.register("DSL_toObj", (raw) => {
  if (typeof raw === "number") return new Num(raw);
});
