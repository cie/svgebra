import { makeAutoObservable } from "mobx";
import { doc } from "../model/document/Doc";
import { parse } from "../model/dsl/DSL";

export class App {
  input = "";
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  execute() {
    try {
      doc.execute(parse(this.input));
      this.error = null;
      this.input = "";
    } catch (e) {
      this.error = e;
    }
  }

  get objects() {
    return [...doc.objects.entries()].map(([name, o]) => ({
      name,
      value: o.commandLine,
    }));
  }
}
export const app = new App();
