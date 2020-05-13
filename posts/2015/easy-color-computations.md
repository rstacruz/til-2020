---
date: '2015-03-03'
title: Easy color computations using Sass & Stylus CLI
tags: [CSS, Sass]
description: Need to lighten or darken colors easily from the command line? Here's how you can do it with Sass or Stylus.
book: notes
---

**Use [stylus]'s CLI for easy color computations.** Stylus CLI is faster than Sass and has shorter syntax for color computations.

```bash
$ npm i -g stylus
$ stylus -i
```

Here's _lighten_ and _hue shift_:

```
> #aaa + 10%
=> #b2b2b2

> #ff0 - 10deg
=> #ffd500
```

### One-liner version

Not quite as elegant, but it can be useful.

```bash
echo "*{a: #ff0 - 10deg}" | stylus -p
* { a: #ffd500; }
```

### Using Sass

If you need Sass for some reason, it also takes `-i`.

```sh
$ gem install sass
$ sass -i
>> darken(red, 10%)
#cc0000
```

[stylus]: http://learnboost.github.io/stylus
