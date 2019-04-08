---
date: '2015-03-03'
title: Easy color computations using Sass/Stylus CLI
tags: [CSS, Sass]
description: Need to lighten/darken colors easily? Here's how.
---

### Stylus CLI

<!-- {.-literate-style} -->

**Use [stylus]'s CLI for easy color computations.** Stylus CLI is faster than Sass and has shorter syntax for color computations.

```bash
$ npm i -g stylus
$ stylus -i
```

<!-- {.-terminal} -->

### Example

<!-- {.-literate-style} -->

Here's _lighten_ and _hue shift_:

```
> #aaa + 10%
=> #b2b2b2

> #ff0 - 10deg
=> #ffd500
```

<!-- {.-terminal} -->

### One-liner version

<!-- {.-literate-style} -->

Not quite as elegant, but it can be useful.

```bash
echo "*{a: #ff0 - 10deg}" | stylus -p
* { a: #ffd500; }
```

<!-- {.-terminal} -->

### Using Sass

<!-- {.-literate-style} -->

If you need Sass for some reason, it also takes `-i`.

```sh
$ gem install sass
$ sass -i
>> darken(red, 10%)
#cc0000
```

<!-- {.-terminal} -->

[stylus]: http://learnboost.github.io/stylus
