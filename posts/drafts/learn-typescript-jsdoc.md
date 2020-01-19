---
title: Learn TypeScript jsdoc in X minutes
layout: simple
---

## Introduction

<!-- {.-hide} -->

### Type checking

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

## Set up

### Add TypeScript to your project

You'll need the [`typescript`](https://yarn.pm/typescript) package in your project.

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

```js
{
  "compilerOptions": {
    "allowJs": true,
    "noEmit": true
  }
}
```

> See: [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## Types

### Parameter types

Use `@param {type} name` to define types for parameters.

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

You can use `options.xxxx` to define an object type.

```js
/**
 * @param {string} text - Text to repeat
 * @param {Object} options
 * @param {number} options.count
 * @param {string} options.separator
 */

function repeat(text, options) {
  console.log(options.count)
  console.log(options.separator)
  // ...
}
```

```js
repeat('hello', { count: 2, separator: '-' })
```

### Variables

```js
/** @type number */
let timeout = 3000
```

### Inline function parameters

For inline functions, annotate their parameters with `/** @type */`.

<!-- prettier-ignore -->
```js
list.reduce((
  /** @type number */ acc,
  /** @type number */ item
) => {
  return acc + item
}, 0)
```

### External types

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

## React

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
