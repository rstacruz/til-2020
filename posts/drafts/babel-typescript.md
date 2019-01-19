---
title: Setting up babel and typescript
---

### Install Babel

```sh
yarn add --dev \
  @babel/core \
  @babel/cli \
  @babel/preset-env \
  @babel/preset-typescript \
  typescript
```

### Babel config

Configure `babel.config.js`

```javascript
module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env'
  ]
}
```

## Auto-compile Babel files

```sh
"scripts": {
  "watch": "babel --watch src ---out-dir lib --extensions '.ts,.tsx'",
  "build": "babel src --out-dir lib --extensions '.ts,.tsx'",
  "tsc": "tsc"
}
```

### Just run tsc

```sh
yarn run tsc
```

## Also see

- https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/
