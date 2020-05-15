---
title: 'What media query breakpoints should I use?'
tags: [CSS]
date: 2019-04-25
layout: simple
book: 2019
---

<figure cover>
<img src='https://source.unsplash.com/SO5jpAT2bN8/600x700' alt='Photo unrelated' />
</figure>

Before we can figure out what media query breakpoints to use, we need to look at what devices we're designing for.

I've dug into some common device resolutions, and most can be grouped into categories. I've listed these categories, along with the resolutions they cater to:

- **Mobile portait** (320px to 414px) &mdash; For devices with 4" to 6.9" screens.

- **Mobile landscape** (568px to 812px) &mdash; Same, but landscape.

- **Tablet portait** (768px to 834px) &mdash; For devices 7" to 10"

- **Tablet landscape** (1024px to 1112px) &mdash; Ditto, but also 12" tablets on portrait

- **Laptop & desktop displays** (1200px+) &mdash; Varies a lot, but is usually 1200px and above

> **Next:** So how do we make sense of these devices?

## Devices

I mostly looked at iOS devices. While Android devices are important too, they have a lot of variance&mdash;device DPI's are adjustable in most phones. Most Android phones ship with defaults that are comparable to iOS's anyway, so let's look at those:

<figure class='table'>

| Category              | Width    | Device                           |
| --------------------- | -------- | -------------------------------- |
| **Mobile, portrait**  | `320px`  | iPhone SE                        |
|                       | `375px`  | iPhone 6, 7, 8, X                |
|                       | `414px`  | iPhone 8 Plus                    |
| **Mobile, landscape** | `568px`  | iPhone SE                        |
|                       | `667px`  | iPhone 6, 7, 8                   |
|                       | `736px`  | iPhone 8 Plus                    |
|                       | `812px`  | iPhone X                         |
| **Tablet, portrait**  | `768px`  | iPad Air, iPad Mini, iPad Pro 9" |
|                       | `834px`  | iPad Pro 10"                     |
| **Tablet, landscape** | `1024px` | iPad Air, iPad Mini, iPad Pro 9" |
|                       | `1024px` | iPad Pro 12" (portrait)          |
|                       | `1112px` | iPad Pro 10"                     |
| **Laptop displays**   | `1366px` | HD laptops (768p)                |
|                       | `1366px` | iPad Pro 12" (landscape)         |
|                       | `1440px` | 13" MacBook Pro (2x scaling)     |
| **Desktop displays**  | `1680px` | 13" MacBook Pro (1.5x scaling)   |
|                       | `1920px` | 1080p displays                   |

</figure>

> **Next:** What breakpoints are most common?

## The most common breakpoints

I took a look at some of the most popular CSS frameworks on 2019 (and some from the past) to see what breakpoints they use. Most of them use the same points, with a small bit of variance.

<figure class='table'>

| Framework       | Small        | Medium                  | Large                     | Exra large               |
| --------------- | ------------ | ----------------------- | ------------------------- | ------------------------ |
| Bulma           | -            | `min: 769px` ("mobile") | `min: 1024px` ("desktop") | `min: 1216px` ("fullhd") |
| Bootstrap 3     | -            | `min: 768px`            | `min: 992px`              | `min: 1200px`            |
| Bootstrap 4     | `min: 576px` | `min: 768px`            | `min: 992px`              | `min: 1200px`            |
| Tailwind        | `min: 576px` | `min: 768px`            | `min: 992px`              | `min: 1200px`            |
| Zurb Foundation | -            | `min: 640px`            | `min: 1024px`             | `min: 1200px`            |

</figure>

### 768px, 992px, 1200px

Many frameworks use `768px`, `992px` and `1200px`. This has been Bootstrap 3's default breakpoints, and seems to be considered sensible enough to have been adopted by other projects.

### No small breakpoints?

Some opt not to have breakpoints below 700px. This is likely taken from Bootstrap 3, which advocated making the mobile landscape view the same as the portrait view. Bootstrap 4 has since changed their position on this, which I personally agree with&mdash;seeing tall headers on a landscape screen is pretty annoying!

### Where did 576px come from?

Before Bootstrap 4 added the `576px` breakpoint, `480px` was a [popular choice](https://github.com/twbs/bootstrap/issues/10203). 576px was eventually chosen since it was [roughly halfway](https://github.com/twbs/bootstrap/issues/21333) between 320px and 768px (+32px). I personally don't think choosing 576px over 480px is a big deal (or the other way around); either one should be enough to cover the 414px width of the iPhone 8 Plus. However, I prefer `480px` since 576px still covers the iPhone SE landscape view.

### 640px

Zurb's `640px` breakpoint is an interesting choice. It covers both tablet-portait and (most of) mobile-landscape.

## So what should I use?

This is mostly subjective and may depend on what screens you would design for. I use this set of breakpoints as a starting point, and I can recommend them for most projects.

<figure class='table'>

| Breakpoint          | Purpose                       |
| ------------------- | ----------------------------- |
| _(default)_         | Mobile-portrait               |
| min-width: `480px`  | Mobile-landscape (and larger) |
| min-width: `768px`  | Tablet-portrait (and larger)  |
| min-width: `992px`  | Tablet-landscape (and larger) |
| min-width: `1200px` | Laptops (and langer)          |

</figure>

### Avoid max-width

I prefer only using `min-width` and avoiding `max-width` as much as possible. Mixing min-width and max-width can make CSS code shorter, but much more difficult to read.

### Offset your max-widths

If you must you `max-width`, be sure to offset it by at least 0.02px. That is, use `max-width: 479.98px` instead of `max-width: 480px`, since the latter will have a small overlap with `min-width: 480px`.

### 480px or 576px?

I suggest using `480px` instead of `576px` simply because it would cover smaller phones as well (eg, iPhone SE).

### Should I use 768px?

The `min-width: 768px` might not be as useful as most would think. If you're designing for tablet-portrait, consider using `min-width: 480px`, it might look good on mobile-landscape as well. Zurb Foundation seems to promote this idea of co-designing for mobile-landscape + tablet-portait too, considering they use `640px` as a breakpoint.

### The mystery of 768px

The `min-width: 768px` breakpoint is often described in guides as "tablet landscape". This is misleading, because it also matches tablet-portrait mode as well. Use `min-width: 992px` if you need to target tablet-landscape. (You can also use `769px`, but that won't cover iPad Pro 10".)

## How should I name them?

I personally don't like calling things `small`, `medium` and `large`. These words can be ambiguous; does an iPad Pro 10" count as medium or large? Would the iPhone SE be counted as extra small? These words are relative, and their subjectiveness can cause some confusion.

I'm not a fan of calling them `mobile`, `tablet` and so on, either. The iPad Pro 12" is a tablet, but why can you only target it with a `desktop` media query? The Samsung Note is technically a phone, but why is it covered with `tablet`? Does `tablet` account for landscape or portrait? The lines between device classifications are a bit blurry nowadays.

Instead, I propose calling it with more generic names. Most designers are intimately familiar with "how 700px feels like", so I think that would make a more appropriate name. I like naming them by their closest hundredths like so.

```css
@custom-media --viewport-4 (min-width: 480px);
@custom-media --viewport-7 (min-width: 768px);
@custom-media --viewport-9 (min-width: 992px);
@custom-media --viewport-12 (min-width: 1200px);
```

```css
@media (--viewport-4) {
  /* ... */
}
```

## Thank you!

I hope you'll find all these helpful. References:

- https://bulma.io/documentation/overview/responsiveness/
- https://getbootstrap.com/docs/3.4/css/
- https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
- https://foundation.zurb.com/sites/docs/media-queries.html
- https://tailwindcss.com/docs/responsive-design/
- https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/Displays/Displays.html
