---
title: A closer look at Tailwind CSS
description: A deep-dive into Tailwind's surprising ideas hiding behind its unconventional syntax
tags: [CSS]
date: 2020-03-20
book: articles
---

<Figure cover>
<img src='https://source.unsplash.com/9APFPoNb9iw/600x300' />
</Figure>

Tailwind is perhaps the hottest CSS framework to come out of 2019. It's gotten not only a lot of hype, but a lot of criticisms as well. Its syntax can easily evoke some bad reactions from even the most experienced developers&mdash;including myself, to be honest.

However, I'm not one to dismiss things for simply looking different on a first glance. Remember how we all thought of JSX when it came out?

I set out to try to dive into Tailwind. Rather than focus on its eccentric syntax, I tried to find out what made it different... and I'm pretty blown away by what I found.

---

## Beyond the class names

You may come across Tailwind examples that have cryptic class names in HTML. I can't blame you if snippets like these would seem wrong:

```html
<div class="mx-auto my-4 md:p-2"></div>
```

If this doesn't sit right with you, you wouldn't be alone. <strong class='highlight'>Not all developers prefer to use Tailwind in this way.</strong> For now, let's set this aside&mdash;lets look at the other Tailwind features that can help make cleaner markup.

<div><NextBlock title="What else does Tailwind have other than a funny syntax?" /></div>

## It's a CSS preprocessor

Writing the class names out in HTML is only one way to use Tailwind. Here's another way to write the example above, writing CSS this time instead of HTML with [PostCSS](https://tailwindcss.com/docs/using-with-preprocessors/#app).

<Figure code>

```css
.dialog {
  @apply md:p-2 mx-auto my-4;
}
```

```html
<div class="dialog"></div>
```

</Figure>

<strong class='highlight'>This works because Tailwind is, first and foremost, a PostCSS plugin.</strong> Tailwind can also be used without PostCSS, but that would be missing out on what I think is Tailwind's hallmark feature: <code>@apply</code>.

<div><NextBlock title="What's so special about this feature?" /></div>

## Composable CSS

The `@apply` directive lets us compose CSS classes from other CSS classes. This, in my opinion, is one of the pillars of the Tailwind philosophy: CSS is easier to understand if it's broken into smaller pieces. Some CSS classes can easily end up being unreadable:

<!-- prettier-ignore -->
```css
.banner {
  box-shadow: 0 0 1px 1px #1121, 0 0 3px 3px #1121;
  background: linear-gradient(45deg, #338899ff, #33884488),
  linear-gradient(90deg, #338899ff, #33884488);
  margin-top: 0;
  margin-bottom: 0;
  @media (min-width: 992px) { max-width: 768px; }
  @media (min-width: 1024px) { max-width: 992px; }
}
```

<!-- prettier-ignore-end -->

One way to make this easier to understand is to separate them into manageable chunks. Tailwind allows you to do just that.

```css
.banner {
  @apply .gradient-purple;
  @apply .shadow-4;
  @apply .container;
}
```

<strong class='highlight'>Tailwind lets you build components from smaller pieces.</strong> They don't need to by Tailwind's utilities&mdash;<code>@apply</code> will work on any class name. These pieces are called "utilities."

<NextBlock title="Aren't utilities just mixins in disguise?" />

## Utilities vs. mixins

This idea of utilities isn't new. Composable CSS is a concept previously explored as _mixins_ by Sass and its cousins. In these pre-processors, you may commonly see mixins take parameters for extra flexibliity. The `shadow-4` utility might look like this in Sass:

```scss
@mixin shadow($depth) {
  box-shadow: 0 $depth $depth #0013, 0 0 ($depth * 1.5) ($depth * 1.5) #0013;
}
```

One key difference here is the Sass mixin is like a function that takes a _depth_ parameter. This can't be done with utilities based on CSS class names.

### The pitfalls of parameters

While parametric Sass mixins can be more liberating, it can also introduce some problems. While the mixin above may let us write `shadow(4px)`, it would also allow any value which potentially can lead to unexpected results. There are no restrictions to what parameters we can pass:

```scss
.banner {
  @include shadow(4px); /* This is great. */
}

.large-banner {
  @include shadow(250.4px); /* But this... I'm not so sure. */
  @include shadow(25%); /* Probably even worse, oh no! */
}
```

<strong class='highlight'>Tailwind doesn't have parametric mixins&mdash;it has something better.</strong> We'll see how this restriction makes sense when we try to write the snippet above in Tailwind.

<div><NextBlock title="Let's see how this might look like as Tailwind utilties." /></div>

## No parameters needed

Utilities in Tailwind are often written with a fixed set of values. This isn't as flexible as Sass's parametric mixins, and this rigidness is intentional. By hand-picking what values are allowed, designers can define the constraints of a design system.

<strong class='highlight'>Parameter-less utilities allow us to build design systems.</strong> The shadow mixin above may be expressed in a Tailwind utility like this:

```css
.shadow-4 {
  box-shadow: /* ... */ ;
}

.shadow-8 {
  box-shadow: /* ... */ ;
}

.shadow-16 {
  box-shadow: /* ... */ ;
}
```

<blockquote class='next'>
<strong>Next:</strong> Let's look at other features of the Tailwind CSS plugin.
</blockquote>

## Theme constants

One common way CSS files become unmanageable is writing some values more than once. It's quite common to use a value like a primary color across multiple rules:

```css
.primary-button {
  background-color: #3388aa;
  /* ... */
}

.navbar {
  background-color: #3388aa;
  /* ... */
}
```

<!-- {data-line='2,7'} -->

Tailwind itself has a solution to make this easier. Values can be defined as _theme constants_. These constants can be used via the `theme()` CSS function.

```css
.primary-button {
  background-color: theme('colors.primary');
  height: theme('dimensions.buttonHeight');
}
```

<div><NextBlock title="Let's look at where these constants are defined." /></div>

## Tailwind config file

The values for theme constants are stored in a Tailwind's JavaScript configuration file, `tailwind.config.js`.

<Figure code title='tailwind.config.js'>

```javascript
module.exports = {
  colors: {
    // Can be accessed in CSS via theme("colors.primary")
    primary: '#3388ff',
  },
}
```

</Figure>

[polished]: https://polished.js.org/

Placing them in JavaScript seems counter-inuitive at first, considering other solutions would have them in CSS files (eg, variables in CSS or Sass). However, having them written in JavaScript has a few advantages.

### Flexibility without compromises

Writing the values in JavaScript allows us to use any kind of logic we may need. Need to have a shades of a color? We can use [polished] to adjust a color&mdash;no Sass functions or PostCSS plugins required.

<Figure code title='tailwind.config.js'>

```javascript
import { darken, lighten } from 'polished'
const primary = '#3388ff'

module.exports = {
  colors: {
    primary: {
      100: darken(0.4, primary),
      300: darken(0.2, primary),
      500: primary,
      700: lighten(0.2, primary),
      900: lighten(0.4, primary),
    },
  },
}
```

</Figure>

Utility classes can be written in either CSS or JavaScript. Complicated logic doesn't have to be written with Sass loops or complicated _calc()_ expressions&mdash;they can be written in JavaScript. For example, here's a rudimentary implementation of [modular scale] in Tailwind:

[modular scale]: https://www.modularscale.com/

<Figure code title='tailwind.config.js'>

```javascript
module.exports = {
  themes: {
    modularscale: { ratio: 1.2 },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const ratio = theme('modularscale.ratio')

      addUtilities({
        '.ms-1': { fontSize: `${ratio ** 1}em` },
        '.ms-2': { fontSize: `${ratio ** 2}em` },
        '.ms-3': { fontSize: `${ratio ** 3}em` },
        '.ms-4': { fontSize: `${ratio ** 4}em` },
      })
    }),
  ],
}
```

</Figure>

Declaring utilities and constants in JavaScript is liberating. <strong class='highlight'>Your CSS will be lightweight and declarative.</strong> The heavy-lifting can be done in JavaScript instead.

<div><NextBlock title="Let's look at how Tailwind deals with margins and spacing." /></div>

## The spacing scale

Tailwind comes with a suite of CSS utility classes. They often come with preset values. For instance, the `margin` helper can accept values like these below, which Tailwind calls this the [spacing scale](https://tailwindcss.com/docs/customizing-spacing/#default-spacing-scale).

<Figure table>

| `.m-0` | `.m-px` | `.m-1` | `.m-2` | `.m-3` | `.m-4` | `.m-6` | `.m-8` | ... |
| :----- | :------ | :----- | :----- | :----- | :----- | :----- | :----- | :-- |
| `0`    | `1px`   | `4px`  | `8px`  | `12px` | `16px` | `24px` | `32px` | ... |

</Figure>

### Case of the missing digits

You'll notice that the list above skips a few steps. There are no utilities available for `m-7` and some other odd numbers. Tailwind is intentionally limiting what values are available to utilities.

By having constraints on possible spacing values, we are guided to a regular grid [4px grid]. <strong class='highlight'>Tailwind makes consistency effortless.</strong>

<div><NextBlock title="Let's look at what all this structure enables for us." /></div>

## Design system guiderails

One common theme across Tailwind's features is how it establishes a lot of structure for us.

- Variables are in a tree-like structure in _tailwind.config.js_. (See: [Nested object syntax](https://tailwindcss.com/docs/customizing-colors/#nested-object-syntax))
- Colors are under `colors`, dimensions in `spacing`, and so on.
- Spacing is defined in a [4px grid], with some numbers intentionally omitted.

<strong class='highlight'>Tailwind lays down the foundation for a design system.</strong> While it comes with reasonable defaults (the default color palette looks great), it also enables you to extend it as you wish.

<div><NextBlock title="What about preprocessors like Sass?" /></div>

## Do we even need Sass?

Tailwind can be used alongside Sass, Less, Stylus, and just about any CSS processor you can choose. Though it may be possible, it's probably a good idea to ask _why_ you would want to. What are the benefits that Sass can introduce? More often than not, it would boil down to these features:

1. Shared uilities & components via mixins
2. Defining colors and dimensions via variables
3. Nesting media queries inside selectors

Most of these problems can be solved by Tailwind's PostCSS plugin&mdash;no other preprocessor required. <strong class='highlight'>Tailwind can make Sass redundant.</strong>

<Figure table>

| Problem              | Sass's solution | Tailwind's solution |
| :------------------- | :-------------: | :-----------------: |
| **Color palette**    |    Variables    |   Theme constants   |
| **Spacing**          |    Variables    |   Theme constants   |
| **Components**       |     Mixins      |      Utilities      |
| **Shared utilities** |     Mixins      |      Utilities      |

</Figure>

---

## Recap

Tailwind is much more than its syntax may lead you to believe. It's a utility-first philosophy, a foundation for a design system, and overall a modern way to write CSS in the age of React and dynamic frontends.

- Tailwind gives you the foundation to implement a design system.
- Tailwind encourages you to define more complex CSS as reusable utilities.
- Tailwind solves many of the same problems that Sass solves.

[Do give Tailwind a try.](https://tailwindcss.com/) If you end up using it, then that's wonderful. Otherwise, I hope its ideas would help influence the way you look at CSS.

<!--

## What about CSS

- but CSS already has variables
- you can still use CSS vars, but for its primary purpose: as vars, not constants

## Macros

- @apply .truncate

-->

[spacing scale]: https://tailwindcss.com/docs/customizing-spacing/#default-spacing-scale
[4px grid]: https://uxdesign.cc/the-4px-baseline-grid-89485012dea6
[material]: https://material.io/design/layout/spacing-methods.html#baseline-grid
[tailwind config]: https://tailwindcss.com/docs/configuration/
[color palette]: https://tailwindcss.com/docs/customizing-colors#default-color-palette
