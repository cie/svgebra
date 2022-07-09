import { Obj } from "../../model/document/Obj"

export class Num extends Obj {
  real: number

  constructor(real: number) {
    super()
    this.real = real
  }

  override get asString() {
    return `${this.real}`
  }

  valueOf() {
    return this.real
  }
}
