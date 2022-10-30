# MICRO REACTIVITY

## react

> 产生一个具有 signal 和 reactive 特性的数据结构

```ts
/* type */
function react<T>(value: T): React<T>;

type Signal<T> = {
  (): T;
  (value: T): void;
  (value: Partial<T>, patch: boolean): void;
  readonly __proto__: T;
};

type Reacts<T> = {
  [key in keyof T]: React<T[key]>;
};

type Pack<T> = T extends number
  ? number
  : T extends string
  ? string
  : T extends boolean
  ? boolean
  : T extends bigint
  ? bigint
  : T extends symbol
  ? symbol
  : T;

type React<T> = Signal<T> & Pack<T>;
```

```tsx
/* use */
const counter = react(0);
const double = () => counter(counter() * 2);

<button onClick={double}>{counter()}</button>;
```

```tsx
/* use */
const data = react({ count: 1 });
const { count } = toRefs(data);
const increase = () => data.count++;

<button onClick={increase}>{count()}</button>;
```
