---
date: '2015-04-14'
title: Speed up MacVim with Lua
description: Make your OSX Vim experience better with this simple switch.
tags: [Vim]
---

It's always a good idea to install [MacVim] with Lua support. [Homebrew] does not compile with Lua support by default. This gets you the benefit of a noticeably-faster [Unite.vim].

```
brew install macvim --with-cscope --with-lua --override-system-vim --with-luajit --with-python3
```

{:.terminal.wide}

The option `--override-system-vim` will allow you to use `vim` in the command line apart from the GUI... also a great idea.

[macvim]: https://github.com/macvim-dev/macvim
[homebrew]: http://brew.sh/
[unite.vim]: https://github.com/Shougo/unite.vim
