---
title: Learn TypeScript jsdoc in X minutes
description: Strict type checking in JavaScript without having to use TypeScript's syntax
layout: simple
---

[TypeScript] lets you annotate your JavaScript with type annotations. It can even check these for errors in build-time, so you can catch errors before they get deployed to production. You'll never have to deal with another _undefined is not a function_ error ever again!

TypeScript by default requires you to make a few changes to your build setup. You'll need to rename your JavaScript files to `.ts` and `.tsx`, and either use `tsc` (the TypeScript Compiler) or Babel (with _preset-typescript_) to compile them.

What if you don't have to?

[typescript]: https://www.typescriptlang.org/

## How it works

When you annotate your JavaScript with some jsdoc types, you can use TypeScript to run some type checks. Here's a _.js_ file with a type error.

```js
/**
 * @param {string} text
 * @param {number} count
 */

function repeat(text, count) {
  return Array(count + 1).join(text)
}

// We'll expect a type error here
repeat('hello', '23') // !
```

### Running type checks

Run `yarn run tsc` (or `./node_modules/.bin/tsc` without Yarn) to do type checks.

```sh
$ yarn run tsc

  text.js:12:17 - error TS2345: Argument of type '"23"' is
  not assignable to parameter of type 'number'.

  12 repeat("hello", "23");
                    ~~~~
```

> **Next:** Let's set up TypeScript on an existing project.

## Adding to a project

The [`typescript`](https://yarn.pm/typescript) package is best installed as part of the project you're working on.

```sh
$ yarn add --dev typescript

  success Saved 1 new dependency.
  info All dependencies
  └─ typescript@3.7.4
  Done in 3.02s.

# For npm, use `npm install --save-dev typescript` instead.
```

### Configuring tsconfig.json

In TypeScript's config, add `allowJs: true` to parse JavaScript files, and `noEmit: true` to prevent TypeScript from emitting output files.

> (See: [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/compiler-options.html))

```js
{
  "compilerOptions": {
    "allowJs": true,
    "noEmit": true
  }
}
```

> **Next:** Let's add types to functions.

## Types in functions

Use `@param` to define types for parameters.

```js
/**
 * @param {string} text
 * @param {number} count
 */

function repeat(text, count) {
  return Array(count + 1).join(text)
}
```

### Object parameters

You can use `options.xxxx` to define an object type. This is useful for parameters that take in options like in the example, or parameters like React props.

```js
/**
 * @param {string} text - Text to repeat
 * @param {Object} options
 * @param {number} options.count
 * @param {string} options.separator
 */

function repeat(text, options = {}) {
  console.log(options.count)
  console.log(options.separator)
  // ...
}
```

```js
repeat('hello', { count: 2, separator: '-' })
```

## More types

Use `@type` to annotate variables. Variable declarations aren't usually typed since they can be inferred.

```js
/** @type number */
let timeout = 3000
```

### Inline function parameters

`@type` can also be used to annotate parameters in inline functions.

<!-- prettier-ignore -->
```js
list.reduce((
  /** @type number */ acc,
  /** @type number */ item
) => {
  return acc + item
}, 0)
```

## External types

Define types in external files.

#### myTypes.d.ts

```js
export interface User {
  name: string
  email: string
}
```

#### The other file

```js
/** @typedef { import('./myTypes').User } User */
```

```js
/** @param {User} author */
function cite(author) {
  // ...
}
```

### Typedefs

Define object types with `@typedef` and `@property`.

```js
/**
 * @typedef {Object} Article
 * @property {string} title - The title of the page
 * @property {number} updatedAt - Last updated time
 */
```

```js
/** @param {Article} article */
```

### Union types

```js
/** @typedef {number | string} NumberOrString */
```

```js
/** @param {NumberOrString} count */
```

## Working with React

### Function components

Function components are plain functions; their props can be defined as object types.

```js
/**
 * This is a React function component.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.url
 * @param {string} props.image
 */

const ArticleLink = props => {
  // ...
}
```

### Class components

Use `@extends` to define the type.

```js
/**
 * This is a React class component.
 *
 * @extends {React.Component<Props, State>}
 */

class MyComponent extends React.Component {
  // ...
}
```
