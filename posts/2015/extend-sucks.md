---
date: '2015-02-16'
title: '@extend sucks'
tags: [CSS, Sass]
description: Let me tell you why you should never use @extend again.
book: archive
---

### What's with @extend?

Using `@extend` in CSS preprocessors really suck... so use mixins instead. Consider this example.

```scss
%antialias {
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale;
}
```

### Using @extend

Seems innocent enough:

```scss
h3 {
  @extend %antialias;
}
```

### With media queries

Until you try it with media queries, then it won't work. Consider using mixins instead.

```scss
@media (max-width: 300px) {
  h3 {
    @extend %antialias;
  }
}
```
