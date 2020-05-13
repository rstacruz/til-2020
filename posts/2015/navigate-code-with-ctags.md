---
date: '2015-04-22'
title: Navigate code like a pro with Ctags
description: Move through code fast. Set up Ctags. Here's how.
layout: simple
tags: [Vim]
attachments:
  - ./images/unite-ctags.png
book: archive
---

<Notice archived>

Ctags is not always the best solution to this today. There are Language Server implementations for some modern languages that wpuld offer these features and more. Also, as of 2019, there are other ctags alternatives to consider today, such as Universal Ctags.

</Notice>

<Figure cover>
<img src='./images/unite-ctags.png' />
</Figure>

[Ctags] lets you navigate code fast, and is perhaps the single most useful productivity boosting tool in any developer's arsenal. If you're not using Ctags yet, let's get you started.

### What's it for?

Ctags indexes a project's _tags_, or names of its classes and methods. Coupled with some integration with your editor (shown: Vim's [unite-tag]), it will give you two interesting features to help you traverse code base:

<figure>

1. Jump to where any class, module, method, or function is defined given its name. In vim, that's `:tag`.

2. Place your cursor on a word, and jump to where it's defined with one keystroke. In vim, that's `^]`.

</figure>

## Installing Ctags

### Exuberant Ctags

In OS X, use Homebrew to install [Exuberant Ctags][ctags]. This is a more useful version of ctags than the one that ships with Xcode.

```bash
brew install ctags
```

### Ctags options

Let's make ctags ignore some common directories. Save this file as `~/.ctags`.

```bash
--recurse=yes
--exclude=.git
--exclude=vendor/*
--exclude=node_modules/*
--exclude=db/*
--exclude=log/*
```

### Generate ctags for a project

Go to your project's path, and run ctags to generate a `tags` file in your project. This is the index of all tags in your project that your editor will use.

```bash
ctags .
```

### Ignore all ctags files

It's safe to make all projects ignore all files called `tags`. I recommend setting up a global git ignore list.

```bash
echo "tags" >> ~/.global_ignore
git config --global core.excludesfile $HOME/.global_ignore
```

## Vim setup

### Auto-update ctags files

Use [vim-autotag] to automatically update `tags` files. This will only work on projects that have already had `ctags -R` performed before.

```bash
Plug 'craigemery/vim-autotag'
```

### Jumping to tags

Use `:tag` to go to the definition of a certain tag. Usually, you will want to use this to jump to a certain Class or Method. Yes, this supports tab completion!

```vim
:tag ClassName
```

### From the command line

Use `vim -t` to open vim to a certain tag.

```bash
vim -t <tag>
```

## Navigating through multiple definition

If you used `:tag` on a tag that's got multiple definitions, use these commands to sift through them all.

| Shortcut | Definition                                 |
| -------- | ------------------------------------------ |
| `:tn`    | Move to next definition (`:tnext`)         |
| `:tp`    | Move to previous definition (`:tprevious`) |
| `:ts`    | List all definitions (`:tselect`)          |

## Key shortcuts

You can also place your cursor on some text and press `^]` to jump to that tag.

| Shortcut | Definition                |
| -------- | ------------------------- |
| `^]`     | Jump to definition        |
| `^t`     | Jump back from definition |
| `^W` `}` | Preview definition        |
| `g]`     | See all definitions       |

## Unite integration

If you're using [unite.vim], you can use [unite-tag] to browse tags. You can also check out my plugin, [vim-fastunite], which offers a pre-packaged distribution of Unite.vim.

```bash
:Unite -start-insert tag
```

## Futher reading

- [Browsing programs with tags](http://vim.wikia.com/wiki/Browsing_programs_with_tags) (vim.wikia.com)

[vim-fastunite]: https://github.com/rstacruz/vim-fastunite
[vim-autotag]: https://github.com/craigemery/vim-autotag
[unite.vim]: https://github.com/Shougo/unite.vim
[unite-tag]: https://github.com/tsukkee/unite-tag
[ctags]: http://ctags.sourceforge.net
