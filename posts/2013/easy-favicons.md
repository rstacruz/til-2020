---
date: '2013-01-07'
title: Easily make favicon.ico
layout: simple
tags: [Development]
description: Never look for a favicon generator again.
book: archive
---

<Notice archived>

**Update (2019):** While this approach still works, it is more common to use other file formats for website icons, such as png's.

</Notice>

To create `favicon.ico`, you don't need anything other than ImageMagick.

```bash
brew install imagemagick
sudo apt-get install imagemagick
```

### Creating icon files

Use it to convert `.png`'s into `.ico` (use 32px and 16px sizes for retina compatibility).

```
convert favicon-32.png favicon-16.png favicon.ico
```

### Resizing icons

You can even use it to generate a 16px version from a 32px:

```
convert favicon-32.png -resize 16x16 favicon16.png
```
