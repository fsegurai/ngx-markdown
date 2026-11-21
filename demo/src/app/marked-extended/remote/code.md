A title, line numbers and highlighted lines from the fence meta:

```ts:line-numbers [config.ts] {2,4-5}
export default {
  title: 'Docs',
  lang: 'en-US',
  themeConfig: {
    nav: [],
  },
};
```

Diff and focus lines from `[!code …]` comments (the removed line is not copied):

```js title="diff.js"
const greeting = 'hello'; // [!code --]
const greeting = 'hello, world'; // [!code ++]
console.log(greeting); // [!code focus]
```

```python showLineNumbers=10
def area(r):
    # [!code warning]
    return 3.14 * r * r
```

Code groups with the same labels switch together:

::: code-group

```bash [npm]
npm install @fsegurai/marked-extended-code
```

```bash [bun]
bun add @fsegurai/marked-extended-code
```

:::

::: code-group

```javascript [JavaScript]
const sum = (a, b) => a + b;
```

```typescript [TypeScript] {1}
const sum = (a: number, b: number): number => a + b;
```

:::

::: code-group

```javascript [JavaScript]
export default sum;
```

```typescript [TypeScript]
export default sum satisfies (a: number, b: number) => number;
```

:::
