import { makeAutoObservable } from "mobx";
import plugins from "../../plugins";
import { Command } from "../dsl/DSL";
import { Obj } from "./Obj";

class Doc {
  objects: Obj[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  execute(command: Command) {
    if (command.type === "add") {
      this.objects.push(command.object);
    }
  }

  get ctx() {
    const funs = {};
    for (const fun of plugins("DSL_function")) funs[fun.name] = fun;
    return funs;
  }
}
export let doc = new Doc();
(window as any).doc = doc;
