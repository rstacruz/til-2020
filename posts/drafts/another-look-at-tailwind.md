---
title: Another look at Tailwind
description: A deep-dive into Tailwind's philosophies beyond its scary syntax
---

Tailwind has gotten not only a lot of hype, but a lot of criticisms as well. Its syntax can easily evoke visceral reactions from experienced developers.

Let's try to look at Tailwind with fresh eyes. I'll try to dive into its concepts _beyond_ the syntax.

## Beyond the class names

You may come across Tailwind examples that have cryptic class names in HTML. I can't blame you if snippets like these would seem wrong:

```html
<div class="md:p-2 mx-auto my-4"></div>
```

If this doesn't sit right with you, you wouldn't be alone. <strong class='highlight'>Many developers prefer not to use Tailwind in this way.</strong> For now, let's set this aside&mdash;lets look at the other Tailwind features that can help make cleaner markup.

## It's a CSS preprocessor

Writing the class names out in HTML is only one way to use Tailwind. Here's another way to write the example above, writing CSS this time instead of HTML:

```css
.dialog {
  @apply md:p-2 mx-auto my-4;
}
```

```html
<div class="dialog"></div>
```

<strong class='highlight'>This works because Tailwind is, first and foremost, a PostCSS plugin.</strong> Tailwind can also be used without PostCSS, but that would be missing out on what I think is Tailwind's hallmark feature: `@apply`.

> **Next:** Let's look at the possibilities _@apply_ opens for us.

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

<strong class='highlight'>Tailwind lets you build components from smaller pieces.</strong> They don't need to by Tailwind's utilities&mdash;`@apply` will work on any class name. These pieces are called "utilities."

> **Next:** Aren't utilities just mixins in disguise?

## Utilities vs. mixins

This idea of utilities isn't new. Composable CSS is a concept previously explored as _mixins_ by Sass and its cousins. In these pre-processors, you may commonly see mixins take parameters for extra flexibliity. The `shadow-4` utility might look like this in Sass:

```scss
@mixin shadow($depth) {
  box-shadow: 0 $depth $depth #0013, 0 0 ($depth * 1.5) ($depth * 1.5) #0013;
}
```

<strong class='highlight'>Parametric mixins like these aren't a feature in Tailwind, and this is by design.</strong> While the mixin above may let us write `shadow(4px)`, it would also allow any value which potentially can lead to unexpected results. There are no restrictions to what parameters we can pass:

```scss
.banner {
  @include shadow(4px); /* This is great. */
}

.large-banner {
  @include shadow(250.4px); /* But this... I'm not so sure. */
  @include shadow(25%); /* Probably even worse, oh no! */
}
```

> **Next:** Let's look at how this might be implemented in Tailwind.

## No parameters needed

Utilities in Tailwind are often written with a predetermined set of values. This is less flexible than Sass's parametric mixins, and this rigidness is intentional. By hand-picking what values are allowed, designers can define the constraints of a design system.

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

> **Next:** Let's look at other features of the Tailwind CSS plugin.

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

> **Next:** Let's look at where these constants are defined.

## Tailwind config file

The values for theme constants are stored in a Tailwind's JavaScript configuration file, `tailwind.config.js`.

```javascript
// tailwind.config.js
module.exports = {
  colors: {
    // Can be accessed in CSS via theme("colors.primary")
    primary: '#3388ff'
  }
}
```

[polished]: https://polished.js.org/

Placing them in JavaScript seems counter-inuitive at first, considering other solutions would have them in CSS files (eg, variables in CSS or Sass). However, having them written in JavaScript has a few advantages.

### Flexibility without compromises

Writing the values in JavaScript allows us to use any kind of logic we may need. Need to have a shades of a color? We can use [polished] to adjust a color&mdash;no Sass functions or PostCSS plugins required.

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
      900: lighten(0.4, primary)
    }
  }
}
```

Utility classes can be written in either CSS or JavaScript. Complicated logic doesn't have to be written with Sass loops or complicated _calc()_ expressions&mdash;they can be written in JavaScript. For example, here's a rudimentary implementation of [modular scale] in Tailwind:

[modular scale]: https://www.modularscale.com/

```javascript
module.exports = {
  themes: {
    modularscale: { ratio: 1.2 }
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const ratio = theme('modularscale.ratio')

      addUtilities({
        '.ms-1': { fontSize: `${ratio ** 1}em` },
        '.ms-2': { fontSize: `${ratio ** 2}em` },
        '.ms-3': { fontSize: `${ratio ** 3}em` },
        '.ms-4': { fontSize: `${ratio ** 4}em` }
      })
    })
  ]
}
};
```

Declaring utilities and constants in JavaScript is liberating. <strong class='highlight'>Your CSS to be light-weight and declarative, and the heavy-lifting can be done in JavaScript.</strong>

> **Next:** Let's look at how Tailwind deals with margins and spacing.

## Spacing grid

Tailwind comes with a suite of CSS utility classes. They often come with preset values. For instance, the `margin` helper can accept values like these below.

| Class  | CSS           |
| ------ | ------------- |
| `.m-1` | `4px` margin  |
| `.m-2` | `8px` margin  |
| `.m-3` | `12px` margin |
| `.m-4` | `16px` margin |
| `.m-8` | `32px` margin |
| ...    | ...           |

<!-- One curious thing about these values is they seem to be in increments of 4px. This is by design. Tailwind follows the principles of a 4px grid&mdash;something [extensively discussed][4px grid] around the web, and used by UI design frameworks like [Material]. -->

### Missing digits

You'll notice that the list above skips a few steps. There are no utilities available for `m-5`, `m-7` and some other odd numbers.

Tailwind is intentionally limiting what values are available to utilities. By having constraints on possible spacing values, it helps effortlessly guide you to a consistent [4px grid].

> **Next:** Let's look at what all this structure enables for us.

## Its design system guiderails

One common theme across Tailwind's features is how it establishes a lot of structure for us.

- Variables are in a tree-like structure in _tailwind.config.js_.
- Colors are under `colors`, dimensions in `spacing`, and so on.
- Spacing is defined in a [4px grid], with some numbers intentionally omitted.

<strong class='highlight'>Tailwind lays down the foundation for a design system.</strong>

## You don't need Sass

- but sass already has variables and mixins
- using tailwind will mean you wont need sass

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
