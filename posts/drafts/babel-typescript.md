---
title: Setting up Babel and TypeScript
tags: [TypeScript, JavaScript]
---

### Install Babel

<!-- {.-literate-style} -->

Install Babel and its required packages. We'll be using [@babel/preset-typescript] to allow Babel to consume TypeScript files, and [typescript] to check our types.

[@babel/preset-typescript]: https://yarn.pm/@babel/preset-typescript
[typescript]: https://yarn.pm/typescript

```sh
yarn add --dev \
  @babel/core \
  @babel/cli \
  @babel/preset-env \
  @babel/preset-typescript \
  typescript
```

### Configure Babel

<!-- {.-literate-style} -->

In `babel.config.js`, add the `preset-typescript` preset. This strips out type annotations from your TypeScript files, allowing Babel to compile them just as it would regular JavaScript.

```
babel.config.js
```

<!-- prettier-ignore -->
```javascript
module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env'
  ]
}
```

This only makes Babel ignore the types&mdash;it doesn't check them! For that, we'll use TypeScript's `tsc`, which we'll get to later.

### Configure TypeScript

<!-- {.-literate-style} -->

Configure TypeScript by creating a file called `tsconfig.json`. Of particular interest here is `noEmit`, which prevents TypeScript from writing its own JavaScript files. We'll only be using TypeScript for type-checking. We'll leave the compilation duties to Babel.

```
tsconfig.json
```

```javascript
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

### Just run tsc

<!-- {.-literate-style} -->

Run `tsc` to check types.

```sh
yarn run tsc
```

## Configuring Babel

### Auto-compile Babel files

<!-- {.-literate-style} -->

Write some scripts.

```sh
"scripts": {
  "watch": "babel --watch src ---out-dir lib --extensions '.ts,.tsx'",
  "build": "babel src --out-dir lib --extensions '.ts,.tsx'",
  "tsc": "tsc"
}
```

## Also see

- https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/
