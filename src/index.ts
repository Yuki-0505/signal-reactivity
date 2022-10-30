import { isReactive, reactive } from '@vue/reactivity'

export * from '@vue/reactivity'

export type Signal<T> = {
  (): T
  (value: T): void
  (value: Partial<T>, patch: boolean): void
  readonly __proto__: T
}

export type Reacts<T> = {
  [key in keyof T]: React<T[key]>
}

export type Pack<T> =
  T extends number
  ? number
  : T extends string
  ? string
  : T extends boolean
  ? boolean
  : T extends bigint
  ? bigint
  : T extends symbol
  ? symbol
  : T

export type React<T> = Signal<T> & Pack<T>

const NULL = Symbol('NULL') as any

export function pack<T>(value: T): T {
  if (value == void 0) return value
  switch (typeof value) {
    case 'boolean':
    case 'string':
    case 'number':
      return Object(value)
    case 'bigint':
    case 'symbol':
    case 'object':
    default:
      return value
  }
}

export function isGetter<T>(value: T): boolean {
  return typeof value === 'function' && isReactive(value())
}

export function react<T>(value: T): React<T> {
  const state = reactive({ value }) as { value: T }
  const read = (() => state) as Signal<{ value: T }>
  return defineReact(read, 'value')
}

function defineReact<T extends object, K extends keyof T>(signal: Signal<T>, key: K): React<T[K]> {
  const react = ((value: T[K] = NULL, patch = false): T[K] | void =>
    value === NULL ? signal()[key] : write(patch ? Object.assign(signal()[key] as any, value) : value)
  ) as React<T[K]>
  const write = (value: T[K]) => { signal()[key] = pack(value) }

  Object.defineProperty(react, '__proto__', { get: () => signal()[key] })

  return new Proxy(react, {
    get(target, key) {
      if (key === '__proto__') return Reflect.get(target, key)
      return Reflect.get(target.__proto__ as any, key)
    },
    set(target, key, value) {
      if (key === '__proto__') return Reflect.set(target, key, value)
      return Reflect.set(target.__proto__ as any, key, value)
    }
  })

}

export function toReacts<T extends object>(state: Signal<T>): Reacts<T> {
  const target = {} as Reacts<T>
  for (const key of Object.keys(state() as T)) {
    target[key as keyof T] = defineReact(state, key as unknown as keyof T)
  }
  return target
}
