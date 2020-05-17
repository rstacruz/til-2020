---
date: '2015-02-23'
title: Use Bower packages like npm packages
tags: [JavaScript]
description: Ever wanted to use some frontend packages but they're not npm-compatible?
book: archive
---

<Notice archived>

**Update (Jan 2019):** Bower hasn't been maintained for years, and using Bower packages should now be considered a discouraged practice.

</Notice>

[Napa] is a package that lets you install arbitrary projects (without package.json) into `node_modules`. Bower packages are repos without package.json manifests. Hence, you can use Napa to use Bower packages as if they were npm packages... sort of.

<Figure code title='package.json'>

```js
// highlight-range{3,6-7}
{
  "scripts": {
    "install": "napa"
  },
  "napa": {
    "hint": "chinchang/hint.css#v1.3.1",
    "colorbox": "jackmoore/colorbox#1.5.9"
  }
}
```

</Figure>

Promising idea, but I'd like to see it developed more. Some caveats as of 1.2.0:

- not compatible with `npm shrinkwrap`
- upgrading packages are not automatic

[napa]: https://www.npmjs.com/package/napa
