import { makeAutoObservable } from "mobx"

export abstract class Obj {
  constructor() {}
  abstract get asString(): string
  toString() {
    return this.asString
  }
  valueOf() {
    throw new Error("Not a number: " + this.constructor.name)
  }
}
