---
title: TypeScript for Flow users
---

Lets talk about TypeScript and Flow.

## Types vs. Interfaces

You can also use `type X = {}` in TypeScript, but interfaces are preferred.

<div data-element="multi-comparison"><div>

#### Flow

```typescript
type User = {
  name: string
  age: number
}
```

Object types are defined in Flow much like object literals. This is how you would typically define types like React props, or options parameters for functions.

</div><div>

#### TypeScript

```typescript
type User = {
  name: string
  age: number
}
```

The same object type of Flow works in TypeScript as well.

</div></div>

### TypeScript's interfaces

<!-- {.-literate-style} -->

The same object type of Flow works in TypeScript as well. However, interfaces are often preferred. Interfaces work much like object types with additional features only available to interface types.

```typescript
interface User {
  name: string
  age: number
}
```

## Type inheritance

### Intersection types

<!-- {.-literate-style} -->

```javascript
// This works for both Flow and TypeScript!
type Customer = User & {
  cardNumber: string
}
```

Types can be extended in Flow using the `&` operator to create an _intersection type_. This effectively creates a new type based on another.
TypeScript also has `&`, just like Flow, so the code on the left will also work. However, one advantage of interfaces is that it can be extended just like classes.

### TypeScript extending interfaces

<!-- {.-literate-style} -->

```typescript
// TypeScript
interface Customer extends User {
  cardNumber: string
}
```

TypeScript also has `&`, just like Flow, so this code will work with either. However, one advantage of interfaces is that it can be extended just like classes.

## Inheritance example

###

<!-- {.-literate-style} -->

Here's an example that works in TypeScript, but not in Flow. Let's try to model a tree structure where there are two types of nodes: _Categories_ and _Products_ (and possibly more), but we want to keep a common `BaseNode` interface for all of them.

```js
type BaseNode = {
  children: BaseNode[],
  type: string
}

type Category = BaseNode & {
  type: 'category',
  children: Product[]
}

type Product = BaseNode & {
  type: 'product'
}

const category: Category = {
  type: 'category',
  children: [{ type: 'product', children: [] }]
}
```

###

<!-- {.-literate-style} -->

In this case, Flow gets confused by the multiple definitions of `type`.

```
Cannot assign object literal to `category` because
string [1] is incompatible with string literal
`category` [2] in property `type`.
```

```js
type BaseNode = {
  type: string /* [1] */
}

type Category = BaseNode & {
  type: 'category' /* [2] */
}
```

## Unsealed objects

<div data-element="multi-comparison"><div>

#### Flow

```javascript
type User = {
  name: string,
  age: number
}
```

```javascript
function getEmail(user: User) {
  // ✓ No error
  console.log(user.email)
}
```

Object types in Flow are "unsealed" by default. They can have additional fields assigned and retrieved from them thay may not br defined in the schema.

</div><div>

#### TypeScript

```typescript
interface User {
  name: string
  age: number
}
```

```javascript
function getEmail(user: User) {
  // ✗ Error
  console.log(user.email)
}
```

In contrast, TypeScript object types and interfaces are all sealed. Accessing any parameter not defined in the schema will produce an error.

</div></div>

## Sealed objects

<div data-element="multi-comparison"><div>

#### Flow

```javascript
type User = {|
  name: string,
  age: number
|}
```

Object types have to be manually sealed in Flow using `{| ... |}` braces.

</div><div>

#### TypeScript

```typescript
type User = {
  name: string
  age: number
}
```

</div></div>

## Importing

<div data-element="multi-comparison"><div>

#### Flow

```javascript
import type { User } from './user'

export type User
```

</div><div>

#### TypeScript

```typescript
import { User } from './user'

export User
```

</div></div>

## Implicit any types

<div data-element="multi-comparison"><div>

#### Flow

```javascript
const greet = user => {
  console.log('hello', user.name)
}
```

</div><div>

#### TypeScript

```typescript
const greet = (user: any) => {
  console.log('hello', user.name)
}
```

</div></div>

## Question mark types

Avoid them in TypeScript. They're considered a `jsdoc` type, which can't be used in many places. In contrast, you have to be explicit in TypeScript: eg, `mytype | void | null` instead of `?mytype`.

<div data-element="multi-comparison"><div>

#### Flow

```javascript
?mytype
```

</div><div>

#### TypeScript

```typescript
mytype | void
```

</div></div>

## Function types

You need parentheses around arguments in TypeScript, but it's optional in Flow. Also, you can omit names in function arguments in Flow, but they're required in TypeScript.

### Flow

```javascript
type getUserName = User => string
```

### Typescript

```typescript
type getUserName = (user: User) => string
```

## Type inheritance

### Flow

```js
export type User = {
  name: string,
  age: number
}

export type AdminUser = User & {
  type: 'admin'
}
```

### TypeScript

```
interface User {
  name: string,
  age: number
}

interface AdminUser extends User {
  role: 'admin'
}
```

## Dynamic keys

Dynamic keys are only available in interfaces, not object types.

### Flow

```javascript
type Users = {
  [id: string]: User
}
```

### TypeScript

```typescript
interface Users {
  [id: string]: User
}
```

## Type coercion (or casting)

### Flow

```javascript
console.log((user: AdminUser).role)
```

### TypeScript

```typescript
console.log((user as AdminUser).role)
```

## Ignoring things

### Flow

```javascript
// $FlowFixMe$
```

### TypeScript

```typescript
// @ts-ignore
```

## React equivalents

| What       | Flow                     | TypeScript                                 |
| ---------- | ------------------------ | ------------------------------------------ |
| Nodes      | `React.Node`             | `React.ReactNode`                          |
| Components | `React.ComponentType<*>` | `React.?`                                  |
| Events     | `React.SyntheticEvent`   | `React.FormEventHandler<HTMLInputElement>` |

## More equivalents

| Flow               | TypeScript        |
| ------------------ | ----------------- |
| `$Keys<OtherType>` | `keyof OtherType` |
