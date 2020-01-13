---
title: Setting up nvidia-xrun
layout: simple
---

## Installing packages

Install `nvidia`, `bbswitch` and `nvidia-xrun` (AUR).

```sh
# Use your favorite AUR helper:
yay -S nvidia bbswitch nvidia-xrun
```

Install `xfce4`. This will be the desktop environment you'll use in nvidia-xrun.

```sh
sudo pacman -Syu xfce4
```

Edit `~/.nvidia-xinitrc` (this is a new file!) to launch xfce4 when running nvidia-xrun.

```sh
if [ $# -gt 0 ]; then
  $*
else
  xfce4-session
fi
```

## Running nvidia-xrun

Switch to an empty tty. Try `ctrl-alt-f2` (or f3, f4...). Log in with your username. (You'll enter a username first, then a password.)

```sh
Arch Linux 5.0.10-arch1-1-ARCH (tty3)

misamino login:
password:
```

Run `nvidia-xrun`. Wait a while - the first run can take a long time!

```sh
nvidia-xrun
```

When you're done, log out of your XFCE4 session, and find your old tty that has your xsession.

```sh
# In case you can't find it, you can restart your display manager
sudo systemctl restart gdm
```
