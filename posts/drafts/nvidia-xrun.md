---
title: Setting up nvidia-xrun
---

## Installing packages

Install `nvidia`, `bbswitch` and `nvidia-xrun` (AUR).

```sh
# Use your favorite AUR helper:
yay -S nvidia bbswitch nvidia-xrun
```

Install `xfce4`. This will be the desktop environment you'll use in nvidia-xrun.

```sh
yay xfce4
```

Edit `~/.nvidia-xinitrc` to launch xfce4 when it's run

```sh
if [ $# -gt 0 ]; then
  $*
else
  xfce4-session
fi
```

## Running nvidia-xrun

If you are running a display manager, stop it first. **This will log you off.**

```sh
sudo systemctl stop display-manager
```

Switch to an empty tty. Try `ctrl-alt-f2` (or f3, f4...). Log in with your username. (You'll enter a username first, then a password.)

```sh
Arch Linux 5.0.10-arch1-1-ARCH (tty3)

misamino login:
```

Run `nvidia-xrun`. Wait a while - the first run can take a long time!

```sh
nvidia-xrun
```

When you're done, log out of your XFCE4 session. Start your DE again by starting your display manager again.

```
sudo systemctl start display-manager
```
