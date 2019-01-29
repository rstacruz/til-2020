---
title: Vim project switcher using Startify
---

### Installing Startify

Install [mhinz/vim-startify](https://github.com/mhinz/vim-startify) in your vimrc.

```vim
Plug 'mhinz/vim-startify'
```

### Saving sessions

Save your current session using `:SSave`.

![](project-switcher-using-startify/startify-ssave.gif)

### Loading sessions

The next time you start `vim` (or `nvim`), you will see a screen of your saved sessions.

![](project-switcher-using-startify/startify-start.gif)

### Loading sessions

From a running Vim session, you can use `:SClose` to switch to a different project. Bonus: by default, this will also save your current session if it's already saved.

![](project-switcher-using-startify/startify-sclose-2.gif)

### Bonus: key bindings

Set up some keybindings. I like these Spacemacs-inspired leader key bindings, but feel free to use any.

```vim
" `SPC l s` - save current session
nnoremap <leader>ls :SSave<CR>

" `SPC l l` - list sessions / switch to different project
nnoremap <leader>ll :SClose<CR>
```

### Extra configuration

Here's some extra config you can try!

```vim
" 'Most Recent Files' number
let g:startify_files_number           = 18

" Update session automatically as you exit vim
let g:startify_session_persistence    = 1

" Simplify the startify list to just recent files and sessions
let g:startify_lists = [
  \ { 'type': 'dir',       'header': ['   Recent files'] },
  \ { 'type': 'sessions',  'header': ['   Saved sessions'] },
  \ ]

" Fancy custom header
let g:startify_custom_header = [
  \ "  ",
  \ '   ╻ ╻   ╻   ┏┳┓',
  \ '   ┃┏┛   ┃   ┃┃┃',
  \ '   ┗┛    ╹   ╹ ╹',
  \ '   ',
  \ ]
```
