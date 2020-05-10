---
title: Type annotations in JavaScript files
tags: [TypeScript, JavaScript, Featured]
layout: simple
description: Can we get the benefits of full type checking without using TypeScript's syntax? Yes we can!
date: 2019-04-07
---

<Figure cover>
<img src='https://source.unsplash.com/L5HG3CH_pgc/900x600' alt='Display' />
</Figure>

[TypeScript] lets you annotate your JavaScript with type annotations. It can even check these for errors in build-time, so you can catch errors before they get deployed to production. You'll never have to deal with another _undefined is not a function_ error ever again!

TypeScript, by default, requires you to make a few changes to your build setup. You'll need to rename your JavaScript files to `.ts` and `.tsx`, and either use `tsc` (the TypeScript Compiler) or Babel (with _preset-typescript_) to compile them.

[typescript]: https://www.typescriptlang.org/

### TypeScript syntax

Many people don't like how working with TypeScript means having to use a new syntax, even if it's a strict superset of JavaScript. If this describes you, then this article is for you.

<Figure code title='typescript-syntax-example.ts'>

```js
/*
 * TypeScript syntax allows you to put inline type annotations... but it's not
 * really JavaScript anymore.
 */

function repeat(text: string, count: number) {
  return Array(count + 1).join(text)
}
```

</Figure>

<NextBlock title="Let's learn about an alternative to the TypeScript syntax." />

## Documenting JavaScript

### The JSDoc syntax

[jsdoc]: http://usejsdoc.org/

You can document TypeScript with [JSDoc] syntax&mdash;the standard syntax for documenting JavaScript. While JSDoc is primarily used as a means of writing documentation, TypeScript can read JSDoc's type annotations.

```js
/**
 * Repeats some text a given number of times.
 *
 * @param {string} text - The text to repeat
 * @param {number} count - Number of times
 */

function repeat(text, count) {
  return Array(count + 1).join(text)
}
```

This means you can take advantage of TypeScript's type checking in JavaScript, without having to convert your JavaScript code to TypeScript.

### Why JSDoc?

It's a great idea to use JSDoc whether you use TypeScript or not. It's the de facto standard for documenting JavaScript, and is supported by a lot of tools and editors.

- [**Use JSDoc: Home**][jsdoc] _(usejsdoc.org)_
- [**JSDoc**](https://en.wikipedia.org/wiki/JSDoc) _(en.wikipedia.org)_

If you're using JSDoc to document your JavaScript, you might as well let TypeScript enforce the integrity of your types in your code.

<div><NextBlock title="Let's set up TypeScript to use JSDoc." /></div>

## TypeScript setup

We'll need TypeScript to get started. Install the [typescript][typescript-npm] npm package in your project to get started.

[typescript-npm]: https://yarn.pm/typescript

```sh
npm install typescript
# -or-
yarn add typescript
```

### Enable JSDoc type checking

Configure TypeScript to check your JavaScript files. (By default, TypeScript only checks `.ts` files.) TypeScript is configured using the `tsconfig.json` file. We'll also be using the `noEmit` option, since we're only going to be using TypeScript as a type checker.

<Figure code title='tsconfig.json'>

```js
{
  "compilerOptions": {
    "allowJs": true,
    "noEmit": true
  }
}
```

</Figure>

### Try it

Run `tsc` to check your project's types. It's recommended to add this to your CI, too, so you can automatically enforce it in your project's changes.

```sh
./node_modules/.bin/tsc
# -or-
yarn run tsc
```

<div><NextBlock title="Let's document our code with JSDoc." /></div>

## Basic annotations

### Annotating function parameters

Use `@param` to document types of a function's parameters. You'll need to put these in JSDoc comments, which are block comments that begin with two stars.

```js
/**
 * @param {string} text
 * @param {number} count
 */

function repeat(text, count) {
  return Array(count + 1).join(text)
}
```

### Documenting code

JSDoc is, first and foremost, a documentation tool. Aside from adding type annotations, you might as well use it to document what your functions do.

```js
/**
 * Repeats a given string a certain number of times.
 *
 * @param {string} text - Text to repeat
 * @param {number} count - Number of times
 */

function repeat(text, count) {
  return Array(count + 1).join(text)
}
```

Here's the same example, but with some text to describe what it does.

<div><NextBlock title="Let's write some more annotations." /></div>

## Documenting parameters

### Optional types

Add an equal sign at the end of a type to signify that it's optional. In this example, `number=` is the same as `number | null | undefined`. This special syntax ("closure syntax") is only available in JSDoc types.

```js
/**
 * @param {string} text
 * @param {number=} count
 */

function repeat(text, count = 1) {
  // ...
}
```

### Documenting options

You can document properties of params, like `options.count` and `options.separator` in this example. You can use this to document React props in function components, too!

<Figure code>

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

</Figure>

<NextBlock title="Let's write some more annotations." />

## Type assertions

### Variables

Use `@type` to provide inline type definitions to function arguments. This isn't typically needed for constants, as TypeScript can usually infer types pretty well. It's a great fit for non-constant variables, though (ie, `let`).

```js
/**
 * Time out in seconds.
 * @type number
 */

let timeout = 3000
```

### Function parameters

`@type` can also be used to provide inline type definitions to function arguments. Great for anonymous functions.

<!-- prettier-ignore -->
```js
list.reduce((
  /** @type number */ acc,
  /** @type number */ item
) => {
  return acc + item
}, 0)
```

<div><NextBlock title="Let's refactor our type definitions to be in external files." /></div>

## Importing definitions

### Importing types

Complex, reusable types are better defined in an external TypeScript file. You can then import these TypeScript definitions into your JavaScript files.

<Figure code>

```js
/** @typedef { import('./myTypes').User } User */
```

```js
/**
 * @param {User} author
 */

function cite(author) {
  // ...
}
```

</Figure>

Import types using the special `import` syntax. You can then define your types in an external `.d.ts` file.

### Defining types externally

Define your types in an ambient definition file (`.d.ts`). Note that these files need to be TypeScript files; there's no way to export type definitions from a `.js` file.

<Figure code title='myTypes.d.ts'>

```js
export interface User {
  name: string
  email: string
}
```

</Figure>

Using _import()_, the JSDoc syntax effectively is as feature-rich as the TypeScript syntax. If the JSDoc syntax is too limiting, you can define your types in a TypeScript file and import them later.

<div><NextBlock title="Can I define complex types in JavaScript files?" /></div>

## Type definitions in JavaScript

### Object types

Use `@typedef` to define a type. External `.d.ts` files are preferred to this approach, but this syntax is available should you need it.

<Figure code>

```js
/**
 * @typedef {Object} Props
 * @property {string} title - The title of the page
 * @property {number} updatedAt - Last updated time
 */
```

```js
/**
 * A component.
 *
 * @param {Props} props
 */

const ArticleLink = (props) => {
  console.log(props.title)
  console.log(props.updatedAt)
  // ...
}
```

</Figure>

### Union types

Use union types (`|`) to signify types that can be one or another. To simplify things, you can define a _typedef_ for them.

```js
/** @typedef {number | string} NumberOrString */
```

<div><NextBlock title="What about React?" /></div>

## Using with React

### Function components

Function components are plain functions. You can document them in any of the ways we previously learned to document functions. In this example, we'll document them using object types.

```js
/**
 * This is a React function component.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.url
 * @param {string} props.image
 */

const ArticleLink = (props) => {
  // ...
}
```

### Class components

Use `@extends` to define the types for your props and state. You can then use `@typedef` (either inline or imports) to define what _Props_ and _State_ are.

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

<div><NextBlock title="Let's write some more annotations." /></div>

## Advanced features

The JSDoc syntax isn't as expressive as the TypeScript syntax, but it comes very close. There are also some other advanced TypeScript features that are available in JSDoc:

- Templates with `@template`
- Return values with `@returns`
- Type guards with `@returns`
- Function types with `@callback`
- Enums with `@enum`
- ...and more

Consult the official [JSDoc in TypeScript][jsdoc-in-typescript] documentation for details on these features and more.

[jsdoc-in-typescript]: https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-TypeScript

<div><NextBlock title="Let's recap what we've learned." /></div>

## Recap

### Documenting functions

Write your documentations as block comments that begin with a double-star. Document parameters with `@param`.

```js
/**
 * Multiply a number by itself.
 * @param {number} n - What to square
 */

function square(n) {
  // ...
```

### Importing type definitions

Import type definitions with `@typedef` and `import`. This allows you to write your type definitions in TypeScript ambient definition files (`.d.ts`).

```js
/** @typedef { import('./myTypes').User } User */
```

### Optionals

Use the equal sign to denote nullable types. This is equivalent to `User | null | undefined`.

```js
/** @param {User=} user */
```

### Anonymous functions

Use `@type` to document parameters of an anonymous function.

```js
numbers.map((/** @type number */ n) => {
  return n * 2
})
```

### Documenting options

You can document the properties of object parameters.

```js
/**
 * @param {Object} options
 * @param {number} options.count
 * @param {string} options.sep
 */

function repeat(options) {
  // ... options.count, options.sep
}
```
