import { reactive } from '@vue/reactivity'

export const store = reactive(new (class {
  // state
  count = 0
  // computed
  get double() {
    return this.count * 2
  }
  get message() {
    return `double is ${this.double}`
  }
  // method
  increase() {
    this.count++
  }
  add(value: number) {
    this.count += value
  }
}))
