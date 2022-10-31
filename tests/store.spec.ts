import { test, expect } from 'vitest'
import { store } from '../src/store'

test('store', async () => {

  expect([store, store.count, store.message])
    .toEqual([{ count: 0 }, 0, `double is 0`])

  store.increase()
  expect([store, store.count, store.message])
    .toEqual([{ count: 1 }, 1, `double is 2`])

  store.add(2)
  expect([store, store.count, store.message])
    .toEqual([{ count: 3 }, 3, `double is 6`])

  // store.double = 10
})
