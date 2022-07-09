import { makeAutoObservable } from "mobx";

export abstract class Obj {
  constructor() {}
  abstract get commandLine(): string;
}
