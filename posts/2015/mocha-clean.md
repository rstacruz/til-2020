---
date: '2015-03-06'
title: Cleaner Mocha stack traces
tags: [JavaScript]
description: Suppress stack trace frames from 3rd-party modules in Mocha.js.
book: archive
---

<Notice archived>

**Update (2018):** Much has changed in Mocha since this post was written in 2015.

</Notice>

[Mocha] is a great way to test JavaScript, but its stack traces are riddled
with useless frames from Mocha internals and 3rd-party modules. Let's try and
clean it up.

<Figure cover>

<img src='./mocha-clean/comparison.png' alt='Comparison screenshot' />

</Figure>

## Introducing mocha-clean

`mocha-clean` is a plugin for Mocha. It strips away mocha internals,
node_modules, absolute paths (based on cwd), and other unneccessary cruft
from stack traces.

### Usage

Simply invoke Mocha with `-r mocha-clean`. The easiest way to do this is to add it to your _test/mocha.opts_ file.

```
--require mocha-clean
```

### Installation

It's available via npm, and works with Mocha 1.x in Node.js and in the browser. The source is available in GitHub: [rstacruz/mocha-clean][src].

```bash
npm install --save-dev mocha-clean
```

## Merging into Mocha?

A pull request is currently open in Mocha to integrate this functionality into Mocha itself. Check out [#1564](https://github.com/mochajs/mocha/pull/1564) and offer your support and comments.

[src]: https://github.com/rstacruz/mocha-clean
[mocha]: http://visionmedia.github.io/mocha
