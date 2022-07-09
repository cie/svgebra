import { makeObservable, observable } from "mobx";
import { Obj } from "../../model/document/Obj";

export class Color extends Obj {
  constructor(public r: number, public g: number, public b: number) {
    super();
    makeObservable(this, {
      r: observable,
      g: observable,
      b: observable,
    });
  }

  override get commandLine() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
