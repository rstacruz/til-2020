---
date: '2015-03-02'
title: Inline SVG in CSS
tags: [CSS]
description: Create complex shapes easily by combining SVG and CSS.
---


###

<!-- {.-literate-style} -->

You can create complex shapes easily by combining SVG and CSS. **[Demo here](http://cssdeck.com/labs/ip24y9lj)** of a white triangle notch implemented using inline CSS, perfect for making parallelograms. The caveats:

```css
.box {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='20' version='1.1'><polyline fill='white' points='0,0 1000,0 0,20'/></svg>")
    left top / 100% auto no-repeat;
}
```

IE9+ supported, legacy IE's arent. Also, hex color codes are not supported. Use `rgb(0, 100, 200)` instead.
