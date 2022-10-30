# SIGNAL REACTIVITY

## 简介

> Base on @vue/reactivity

## API 文档

> [点此查看](https://github.com/Yuki-0505/signal-reactivity/blob/master/API.md)

## 安装

```bash
# npm
npm i signal-reactivity
# or pnpm
pnpm i signal-reactivity
# or yarn
yarn add signal-reactivity
```

## 尝试

- [RunKit 在线运行](https://npm.runkit.com/signal-reactivity)

## 案例

```ts
// 为复杂对象添加响应式
const data = react({ count: 0 });
// 解构
const { count } = toReacts(data);

expect(data()).toEquals({ count: 0 });
expect(count() == 0).toBe(true);

// 复杂对象赋值
data({ count: 1 });
expect(count() == 1).toBe(true);

// 修改属性
data.count++;
expect(count() == 2).toBe(true);

// 修改基础类型
count(++data.count + 1);
expect(count() == 4).toBe(true);

// 解构
const { count: counter } = toReacts(data);
counter(data.count + 1);
expect(count() == 5).toBe(true);
```

## 测试

> [测试用例](https://github.com/Yuki-0505/signal-reactivity/tree/master/tests)
