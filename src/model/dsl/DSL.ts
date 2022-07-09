import plugins from "../../plugins";
import { doc } from "../document/Doc";
import { Obj } from "../document/Obj";

declare global {
  interface PluginPoints {
    DSL_function: Function;
  }
}

export type Command = { type: "add"; object: Obj };

declare global {
  interface PluginPoints {
    DSL_preprocess: (s: string) => string;
  }
}

export function parse(input: string): Command {
  const ctx = Object.create(doc.ctx);
  const compiled = new Function(
    "__ctx",
    `with(__ctx){
      return ((((${input}))));
    }`
  );
  const raw = compiled(ctx);
  let result: Obj;
  result = toObj(raw, result);

  return { type: "add", object: result };
}

declare global {
  interface PluginPoints {
    DSL_toObj: (raw: any) => Obj | undefined;
  }
}

function toObj(raw: any, result: Obj) {
  if (raw instanceof Obj) return raw;
  for (const converter of plugins("DSL_toObj")) {
    const r = converter(raw);
    if (r) return r;
  }
  throw new Error(`Unsupported value type: ${raw}`);
}
