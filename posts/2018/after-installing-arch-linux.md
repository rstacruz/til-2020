---
title: After installing Arch Linux
date: '2018-12-12'
tags: [Linux]
---

These are things I suggest to do after an Arch Linux installation. These are items not covered in the official [Arch Linux Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide#Network_configuration), but I strongly suggest you do!

<next-block title="Let's get started."></next-block>

## Go online

For these next steps, we're going to assume that you're logged in as your main user, who has `sudo` permissions enabled.

### Network connectivity 🌎

<!-- {.-literate-style} -->

Install some networking tools, so we may be able to go online later. [NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) is used by most desktop environments to manage network connections, and can be used in the console as well via `nmtui`.

```sh
sudo pacman -S networkmanager
sudo systemctl enable NetworkManager
```

### Try to go online

<!-- {.-literate-style} -->

Use `nmtui` to go online right now using your wifi.

```sh
# Try it out
sudo systemctl start NetworkManager

# Connect to a wifi
nmtui
```

### Did it work?

<!-- {.-literate-style} -->

This should be enough to get most laptops online. For some others, you may need to install wireless drivers. For instance, MacBooks require [Broadcom wireless](https://wiki.archlinux.org/index.php/Broadcom_wireless) drivers.

<next-block title="Let's install some apps."></next-block>

## Install packages

### Developer tools

<!-- {.-literate-style} -->

Install some dev tools. [base-devel] installs a lot of tools you'll need to compile things, and [git] is required to build a lot of things from the AUR.

```sh
sudo pacman -S \
  base-devel \
  git \
  vim
```

[base-devel]: https://www.archlinux.org/groups/x86_64/base-devel/
[git]: https://www.archlinux.org/packages/extra/x86_64/git/

### Web browser 🌎

<!-- {.-literate-style} -->

Install a browser. Choose from any of these options (or all!). Chromium is the open-source version of Google Chrome.

```sh
pacman -S \
  chromium \
  firefox
```

### Fonts 💅

<!-- {.-literate-style} -->

Install some basic fonts. [ttf-croscore] are Chrome OS fonts. You can install more fonts later from the AUR, but we'll get to that later.

[ttf-croscore]: https://www.archlinux.org/packages/extra/any/ttf-croscore/

```sh
pacman -S \
  noto-fonts \
  noto-fonts-emoji \
  ttf-croscore \
  ttf-roboto
```

<next-block title="Let's install some drivers."></next-block>

## Install drivers

### (Optional) Linux LTS

<!-- {.-literate-style} -->

_(Optional)_ You can install an older version of the Linux kernel if you feel the latest kernel may be too bleeding-edge for you.

```sh
pacman -S linux-lts
```

### Video driver

<!-- {.-literate-style} -->

Depending on your setup, you may also need to install an xf86 driver. See [this search](https://www.archlinux.org/packages/?sort=&q=xf86-video&maintainer=&flagged=) for available drivers.

```sh
# If you're using ATI:
pacman -S xf86-video-ati

# If you're using Intel:
pacman -S xf86-video-intel

# ...see the list of packages to
#   find one that might be appropriate
#   for your setup!
```

<next-block title="Let's install a desktop environment."></next-block>

## Desktop environment

You'll need to install a desktop environment and a display manager. You can choose between `gnome` (default for Ubuntu), `cinnamon` (default for Mint), `deepin`, `xfce4`, `plasma` and many others. I recommend GNOME.

### Install GNOME and GDM

<!-- {.-literate-style} -->

Install a desktop environment and a display manager. **GNOME** is a good first choice; it's the default of the Ubuntu desktop, and is a great desktop environment overall. **GDM** is the GNOME Display Manager.

```sh
# Install gdm and gnome
pacman -S \
  gdm \
  gnome
```

### Try it out

<!-- {.-literate-style} -->

Start the GDM service right now. This should get you to a graphical login screen! You can log in with your user here and get to a desktop environment.

```sh
# Start the GDM display manager
sudo systemctl start gdm
```

### Enable it on startup

<!-- {.-literate-style} -->

If you were able to log into a desktop environment in the previous step, congratulations! Open a terminal and enable the `gdm` service to start it up on every boot up.

```sh
# Enable GDM on startup
sudo systemctl enable gdm
```

<next-block title="Let's set up your swap file."></next-block>

## Creating swap

### Set up your swap

<!-- {.-literate-style} -->

If you skipped creating a swap partition like I recommended, you can use [systemd-swap](https://wiki.archlinux.org/index.php/Swap#systemd-swap) to manage your swap.

```sh
sudo pacman -S systemd-swap
```

### Edit the config

<!-- {.-literate-style} -->

Edit the config. I recommend setting `zram_enabled`
to `1` (compressed RAM) and `swapfc_enabled` to `1`
(auto-managed swap files).

```sh
# Enable `zram_enabled=1` and `swapfc_enabled=1`
sudo vi /etc/systemd/swap.conf
```

### Enable it

<!-- {.-literate-style} -->

Start and enable `systemd-swap.service`.

```sh
# Start it now
sudo systemctl start systemd-swap

# Enable it on every reboot
sudo systemctl enable systemd-swap
```

### Mount it on startup

<!-- {.-literate-style} -->

Add your swapfile to `/etc/fstab` so it'll be used on every boot.

```sh
# Edit your fstab partitions
sudo vim /etc/fstab
```

```sh
# add this to the end:
/swapfile none swap defaults 0 0
```

<next-block title="What is the Arch User Repository?"></next-block>

## AUR (Arch User Repository)

The [AUR], or Arch User Repository, contains a lot of community-maintained packages that you won't find in the official repositories. This ranges from proprietary non-free packages (like NVidia drivers). For most Arch users, the AUR is their reason to use Arch Linux, so I highly recommend installing an AUR helper.

[aur]: https://aur.archlinux.org/packages/

### AUR helper

<!-- {.-literate-style} -->

You'll need an AUR helper to install packages from the AUR. I recommend [yay](https://github.com/Jguer/yay).

```sh
# Go to your home folder
cd

# Make and install `yay`
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### How to use yay

<!-- {.-literate-style} -->

After it's installed, you can use it just like how you would use `pacman`.

```sh
yay packagename      # search for a package to install
yay -S packagename   # install a package
yay                  # check system for updates
```

<next-block title="What can I install from the AUR?"></next-block>

## Some AUR packages

Some AUR packages I can recommend to almost any Arch Linux user:

| Package                                                                                    | Description                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [pamac-aur](https://aur.archlinux.org/packages/pamac-aur/)                                 | Get notified of package updates            |
| [ttf-google-fonts-typewolf](https://aur.archlinux.org/packages/ttf-google-fonts-typewolf/) | 40+ Google fonts                           |
| [ttf-ms-fonts](https://aur.archlinux.org/packages/ttf-ms-fonts/)                           | Fonts from microsoft (arial, courier, etc) |
| [ttf-mac-fonts](https://aur.archlinux.org/packages/ttf-mac-fonts/)                         | Fonts from macOS (lucida grande, etc)      |
| [otf-san-francisco](https://aur.archlinux.org/packages/otf-san-francisco)                  | Fonts from iOS                             |

<!-- {.-wide} -->
