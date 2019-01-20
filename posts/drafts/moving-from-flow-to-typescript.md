---
title: TypeScript vs. Flow
---

## Open objects

You can also use `type X = {}` in TypeScript, but interfaces are preferred.

<multi-comparison><div>

#### Flow

```javascript
type User = {
  name: string,
  age: number
}
```

</div><div>

#### TypeScript

```typescript
interface User {
  name: string
  age: number
}
```

</div></multi-comparison>

## Sealed objects

<multi-comparison><div>

#### Flow

```javascript
type User = {|
  name: string,
  age: number
|}
```

</div><div>

#### TypeScript

```typescript
type User = {
  name: string
  age: number
}
```

</div></multi-comparison>

## Importing

<multi-comparison><div>

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

</div></multi-comparison>

## Implicit any types

<multi-comparison><div>

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

</div></multi-comparison>

## Question mark types

Avoid them in TypeScript. They're considered a `jsdoc` type, which can't be used in many places. In contrast, you have to be explicit in TypeScript: eg, `mytype | void | null` instead of `?mytype`.

<multi-comparison><div>

#### Flow

```javascript
?mytype
```

</div><div>

#### TypeScript

```typescript
mytype | void
```

</div></multi-comparison>

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
