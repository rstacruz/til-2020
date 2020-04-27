---
date: '2015-05-19'
title: Installing iojs on Homebrew
tags: [MacOS]
image: images/iojs-linking.png
description: Here's how to get iojs on OSX using Homebrew.
layout: simple
attachments:
  - ./iojs-on-homebrew/iojs-linking.png
---

<blockquote class='notice'>

**Update (Jan 2019):** io.js has already been merged into Node.js since v4, and is now considered deprecated. Consider using nodejs instead.

</blockquote>

<figure class='cover'>
<img src='./iojs-on-homebrew/iojs-linking.png' />
</figure>

### Homebrew formula

<!-- {.-literate-style} -->

An updated [homebrew-iojs] formula is maintained by [@aredridel] and is available with just one command.

```bash
brew install aredridel/iojs/iojs
```

### Default formula

<!-- {.-literate-style} -->

As of iojs 2.0.2, Homebrew ships with its own formula for iojs. This isn't preferrable, in my opinion, since global npm packages aren't being ran properly.

```bash
brew install iojs
brew unlink node
brew link iojs --force
```

If you'd like to use this anyway, simply doing `brew install iojs` is not enough. To get iojs working on [Homebrew] You will need to unlink `node` first then use `link --force` to install iojs.

[homebrew-iojs]: https://github.com/aredridel/homebrew-iojs/blob/master/Formula/iojs.rb
[@aredridel]: https://github.com/aredridel
[homebrew]: http://brew.sh/
