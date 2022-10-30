import { test, expect } from 'vitest'
import { react, toReacts } from '../src'
import type { React } from '../src'

test('react base type', async () => {
  const count = react(0)

  expect(count()).toBe(0)
  count(1)
  expect(count() == 1).toBe(true)
})

test('react object type', async () => {
  const data = react(null) as React<{ count: number }>
  expect(data()).toEqual(null)

  data({ count: 0 })
  const { count } = toReacts(data)
  expect(count()).toBe(0)

  data({ count: 1 })
  expect(count() == 1).toBe(true)

  data.count++
  expect(count() == 2).toBe(true)

  count(++data.count + 1)
  expect(count() == 4).toBe(true)

  const { count: counter } = toReacts(data)
  counter(data.count + 1)
  expect(count() == 5).toBe(true)
})

test('react object patch', async () => {
  const data = react({ count: 1, value: 2 })
  const { count, value } = toReacts(data)

  data({ value: 3 }, true)
  expect(value() == 3).toBe(true)

  count(4)
  expect(count() == 4).toBe(true)

  count(5, true)
  expect(count() == 4).toBe(true)
})
