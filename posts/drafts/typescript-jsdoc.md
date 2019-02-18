---
title: Type annotations in JavaScript files
---

[TypeScript] lets you annotate your JavaScript with type annotations. It can even check these for errors in build-time, so you can catch errors before they get deployed to production. You'll never have to deal with another _undefined is not a function_ error ever again!

[typescript]: https://www.typescriptlang.org/

TypeScript, by default, requires you to make a few changes to your build setup. You'll need to rename your JavaScript files to `.ts` and `.tsx`, and either use `tsc` (the TypeScript Compiler) or Babel (with _preset-typescript_) to compile them.

### TypeScript syntax

Many people don't like how working with TypeScript means having to use a new syntax, even if it's a strict superset of JavaScript.
If this describes you, then this article is for you.

```js
function repeat(text: string, count: number) {
  return Array(count + 1).join(text)
}
```

<next-block title="Let's learn about an alternative to the TypeScript syntax."></next-block>

## Documenting JavaScript

### The JSDoc syntax

[jsdoc]: http://usejsdoc.org/

<!-- {.-literate-style} -->

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

This means you can take advantage of TypeScript's type checking _in JavaScript_, without having to convert your JavaScript code to TypeScript.

### Why JSDoc?

<!-- {.-literate-style} -->

It's a great idea to use JSDoc whether you use TypeScript or not. It's the de facto standard for documenting JavaScript, and is supported by a lot of tools and editors.

<figure class='-bordered'>

- [**Use JSDoc: Home**][jsdoc] _(usejsdoc.org)_
- [**JSDoc**](https://en.wikipedia.org/wiki/JSDoc) _(en.wikipedia.org)_

</figure>

If you're using JSDoc to document your JavaScript, you might as well let TypeScript enforce the integrity of your types in your code.

<next-block title="Let's set up TypeScript to use JSDoc."></next-block>

## TypeScript setup

### Install TypeScript

<!-- {.-literate-style} -->

You'll need TypeScript to do this. Install the [typescript][typescript-npm] npm package in your project to get started.

[typescript-npm]: https://yarn.pm/typescript

```sh
npm install typescript
# -or-
yarn add typescript
```

### Enable JSDoc type checking

<!-- {.-literate-style} -->

Configure TypeScript to check your JavaScript files. (By default, TypeScript only checks `.ts` files.) TypeScript is configured using the `tsconfig.json` file. We'll also be using the `noEmit` option, since we're only going to be using TypeScript as a type checker.

```js
tsconfig.json
```

```js
{
  "compilerOptions": {
    "allowJs": true,
    "noEmit": true
  }
}
```

### Setting it up

<!-- {.-literate-style} -->

In the `.js` files that you want checked, add a `@ts-check` comment at the top of the file. This tells TypeScript to perform type checking on it.

```js
// @ts-check
```

### Try it

<!-- {.-literate-style} -->

Run `tsc` to check your project's types. It's recommended to add this to your CI, too, so you can automatically enforce it in your project's changes.

```sh
./node_modules/.bin/tsc
# -or-
yarn run tsc
```

<next-block title="Let's document your code using JSDoc."></next-block>

## Basic annotations

### Annotating function parameters

<!-- {.-literate-style} -->

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

<!-- {.-literate-style} -->

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

<next-block title="Let's write some more annotations."></next-block>

## Documenting parameters

### Optional types

<!-- {.-literate-style} -->

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

<!-- {.-literate-style} -->

You can document properties of params, like `options.count` and `options.separator` in this example. You can use this to document React props in function components, too!

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

<next-block title="Let's write some more annotations."></next-block>

## Type assertions

### Variables

<!-- {.-literate-style} -->

Use `@type` to provide inline type definitions to function arguments. This isn't typically needed for constants, as TypeScript can usually infer types pretty well. It's a great fit for non-constant variables, though (ie, `let`).

```js
/**
 * Time out in seconds.
 * @type number
 */

let timeout = 3000
```

### Function parameters

<!-- {.-literate-style} -->

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

<next-block title="Let's refactor our type definitions to be in external files."></next-block>

## Importing definitions

### Importing types

<!-- {.-literate-style} -->

Complex, reusable types are better defined in an external TypeScript file. You can then import these TypeScript definitions into your JavaScript files.

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

Import types using the special `{ import('...') }` syntax. You can then define your types in an external `.d.ts` file.

### Defining types externally

<!-- {.-literate-style} -->

Define your types in an ambient definition file (`.d.ts`). Note that these files need to be TypeScript files; there's no way to export type definitions from a `.js` file.

```js
/* myTypes.d.ts */
export interface User {
  name: string
  email: string
}
```

Using _import()_, the JSDoc syntax effectively is as feature-rich as the TypeScript syntax. If the JSDoc syntax is too limiting, you can define your types in a TypeScript file and import them later.

<next-block title="Can I define complex types in JavaScript files?"></next-block>

## Type definitions in JavaScript

### Object types

<!-- {.-literate-style} -->

Use `@typedef` to define a type. External `.d.ts` files are preferred to this approach, but this syntax is available should you need it.

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

const ArticleLink = props => {
  console.log(props.title)
  console.log(props.updatedAt)
  // ...
}
```

### Union types

<!-- {.-literate-style} -->

Use union types (`|`) to signify types that can be one or another. To simplify things, you can define a _typedef_ for them.

```js
/** @typedef {number | string} NumberOrString */
```

<next-block title="What about React?"></next-block>

## Using with React

### Function components

<!-- {.-literate-style} -->

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

const ArticleLink = props => {
  // ...
}
```

### Class components

<!-- {.-literate-style} -->

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

<next-block title="Let's write some more annotations."></next-block>

## Advanced features

###

<!-- {.-literate-style} -->

The JSDoc syntax isn't as expressive as the TypeScript syntax, but it comes very close. There are also some other advanced TypeScript features that are available in JSDoc:

- Templates with `@template`
- Return values with `@returns`
- Type guards with `@returns`
- Function types with `@callback`
- Enums with `@enum`
- ...and more

Consult the official [JSDoc in TypeScript][jsdoc-in-typescript] documentation for details on these features and more.

[jsdoc-in-typescript]: https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-TypeScript

<next-block title="Let's recap what we've learned."></next-block>

## Recap

### Type-checking JavaScript

<!-- {.-literate-style} -->

Add a `@ts-check` comment to the JavaScript files that you want to type-check.

```js
// @ts-check
```

### Documenting functions

<!-- {.-literate-style} -->

Write your documentations as block comments that begin with a double-star. Document parameters with `@param`.

```js
/**
 * Repeats some text a given number of times.
 *
 * @param {string} text - The text to repeat
 * @param {number} count - Number of times
 */

function repeat(text, count) {
  // ...
}
```

### Importing type definitions

<!-- {.-literate-style} -->

Import type definitions with `@typedef { import }`. This allows you to write your type definitions in TypeScript ambient definition files (`.d.ts`).

```js
/** @typedef { import('./myTypes').User } User */
```

### Optionals

<!-- {.-literate-style} -->

Use the equal sign to denote nullable types. This is equivalent to `User | null | undefined`.

```js
/** @param {User=} user */
```

### Anonymous functions

<!-- {.-literate-style} -->

Use `@type` to document parameters of an anonymous function.

```js
numbers.map((/** @type number */ n) => {
  return n * 2
})
```

###Documenting options

<!-- {.-literate-style} -->

You can document object parameters.

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
