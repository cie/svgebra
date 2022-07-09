export class DefaultsMap<K, V extends NonNullable<any>> extends Map<K, V> {
  constructor(private factory: () => V) {
    super()
  }
  get(key: K): NonNullable<V> {
    let r = super.get(key)
    if (!r) super.set(key, (r = this.factory()))
    return r as NonNullable<V>
  }
}
