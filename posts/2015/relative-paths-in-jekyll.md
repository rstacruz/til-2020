---
date: '2015-03-13'
title: Relative paths in Jekyll
tags: [Development, Jekyll]
description: Fix the problem with GitHub Pages's relative URLs with this snippet.
book: archive
---

[Jekyll] is a great static site tool. If you're using [GitHub Pages][gh-pages], it comes with it for free, making it a very useful tool for any public blog or website. It comes, though, with one common problem that I've yet to come across a good solution for: relative paths.

<NextBlock title="Why are relative paths a problem?" />

## The problem

### The mess of relative paths

Let's say you have an innocent URL in your layout like the one below. This is a relative path, not an absolute one that begins with `/`. It resolves based on wherever it's included from.

<Figure code title='_layouts/default.html'>

```html
<link href="assets/style.css" rel="stylesheet" />
```

</Figure>

This works well in pages of your site placed in the root directory. Once you path one level deep though, you'll encounter problems.

<Figure bordered>

| From this page...     | Base     | Final URL                 |  Result |
| --------------------- | -------- | ------------------------- | ------: |
| `/index.html`         | `/`      | `/assets/style.css`       |  Good ✓ |
| `/me.html`            | `/`      | `/assets/style.css`       |  Good ✓ |
| `/about/profile.html` | `/about` | `/about/assets/style.css` | Wrong ✗ |

</Figure>

<next-block title="How do we usually work around them?"></next-block>

## A naive workaround

One workaround is to use absolute paths by adding a `/` in the beginning.

```html
<link href="/assets/style.css" rel="stylesheet" /> ^
```

### Why absolute URLs suck

This works great for sites that live on its own domain. When your site will be hosted in a sub-directory (such as the case with [GitHub Project Pages][gh-pages]), this absolute path will not resolve to `/project/assets/style.css` as you probably would have intended.

<Figure bordered>

| If your site is in...     | It resolves to...   |         |
| ------------------------- | ------------------- | ------: |
| `user.github.io/`         | `/assets/style.css` |  Good ✓ |
| `user.github.io/project/` | `/assets/style.css` | Wrong ✗ |

</Figure>

## A better workaround

This snippet below automatically determines the relative base and stores it in the variable `base`. Place it in your partials path, and include the partial in your layouts.

<Figure code title='_includes/base.html'>

<!-- prettier-ignore -->
```html
{% assign base = ''
%}{% assign depth = page.url | split: '/' | size | minus: 1
%}{% if depth <= 1
%}{% assign base = '.'
%}{% elsif depth == 2
%}{% assign base = '..'
%}{% elsif depth == 3
%}{% assign base = '../..'
%}{% elsif depth == 4
%}{% assign base = '../../..'
%}{% endif
%}
```

</Figure>

> **Tip:** You can also collapse this into one line.

### Use it as a prefix

You can then use it as a prefix to URLs, like the examples below. You don't need to `include` it all the time—just include it once in your layouts and it will be available everywhere.

<Figure code>

```html
{% include base.html %}
<link href="{{base}}/assets/style.css" rel="stylesheet" />
```

```html
<a href="{{ base }}">Back to home</a>
```

```html
<a href="{{ base }}/about.html">About me</a>
```

```html
<a href="{{ base }}{{ post.url }}">Read "{{ post.title }}"</a>
```

</Figure>

[jekyll]: http://jekyllrb.com/
[gh-pages]: http://pages.github.com/
