---
title: Setting up Babel and TypeScript
description: A quick guide on setting up Babel as a TypeScript compiler
layout: simple
tags: [TypeScript, JavaScript, Featured]
date: 2019-04-10
book: 2019
---

You can use Babel as a TypeScript compiler. This means much faster compilations, and you can use Babel plugins in TypeScript just as you would with JavaScript.

<Figure cover>
<img src='https://source.unsplash.com/CNmvgopt0L8/600x400' alt='Unrelated photo' />
</Figure>

To do this, we'll configure `tsc` (the TypeScript compiler) only check types, but not emit files. We'll use Babel to do the actual compilation.

## Installing packages

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

> Note: If you're already using a bundler like Webpack or Rollup, you may not need <code>@babel/cli</code>.

## Configuration

### Configure Babel

In `babel.config.js`, add the <strong class='highlight'>preset-typescript</strong> preset. This strips out type annotations from your TypeScript files, allowing Babel to compile them just as it would regular JavaScript.

<Figure code title='babel.config.js'>

<!-- prettier-ignore -->
```javascript
module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env'
  ]
}
```

</Figure>

This only makes Babel ignore the types&mdash;it doesn't check them! For that, we'll use TypeScript's `tsc`, which we'll get to later.

### Configure TypeScript

Configure TypeScript by creating a file called `tsconfig.json`. Of particular interest here is `noEmit`, which prevents TypeScript from writing its own JavaScript files. We'll only be using TypeScript for type-checking. We'll leave the compilation duties to Babel.

<Figure code title='tsconfig.json'>

```javascript
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

</Figure>

## Trying it out

### Check types with `tsc`

Run `tsc` to check types. This should print a few errors if you have any.

```sh
yarn run tsc
```

### Build files with `babel`

If you installed `@babel/cli`, you can test building files using the `babel` command. (Note: if you're using Webpack or Rollup, you don't need this package; use Webpack/Rollup to compile your JavaScript instead.)

```sh
yarn run babel src --out-dir lib --extensions '.ts,.tsx'
```

## Configuring Babel-CLI

You can use Babel without Webpack or Rollup. If you're using already Webpack or Rollup, you can skip this; this is mostly ideal for writing small open-source libraries with limited compilation needs.

### Auto-compile Babel files

You can use `@babel/cli` to compile files. In this example, we'll set up some NPM scripts to convert every TypeScript file in `src/` to JavaScript files into `lib/`.

<Figure code title='package.json'>

```sh
"scripts": {
  "watch": "babel src --out-dir lib --extensions '.ts,.tsx' --watch",
  "build": "babel src --out-dir lib --extensions '.ts,.tsx'",
  "tsc": "tsc"
}
```

</Figure>

## References

This article was written for TypeScript 3.x and Babel 7.x. Here are some links for further reading:

- [TypeScript and Babel 7](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/) _(msdn.microsoft.com)_
