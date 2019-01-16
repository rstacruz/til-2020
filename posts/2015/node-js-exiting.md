---
date: '2015-02-17'
title: Node.js exit hooks
tags: [JavaScript]
description: Catch a Node program from exiting with these events.
---

###

<!-- {.-literate-style} -->

atch a Node program from exiting with these events. Usually useful for test frameworks or daemon runners or whatever.

```js
process.on('uncaughtException', err => { ... })
process.on('SIGHUP', ...)
process.on('exit', ...)
process.on('beforeExit', ...)
```
