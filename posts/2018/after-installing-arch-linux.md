---
title: After installing Arch Linux
date: '2018-12-12'
tags: [Arch Linux]
---

These are things I suggest to do after an Arch Linux installation. These are items not covered in the official [Arch Linux Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide#Network_configuration), but I strongly suggest you do!

<next-block title="Let's get started."></next-block>

## Install some more packages

### Developer tools

<!-- {.-literate-style} -->

Install some dev tools. [base-devel] installs a lot of tools you'll need to compile things, and [git] is required to build a lot of things from the AUR.

```sh
pacman -S \
  base-devel \
  git \
  vim
```

[base-devel]: https://www.archlinux.org/groups/x86_64/base-devel/
[git]: https://www.archlinux.org/packages/extra/x86_64/git/

### Network connectivity 🌎

<!-- {.-literate-style} -->

Install NetworkManager. Most desktop env's will need it to manage your wifi and such. You can even use `nmtui` to connect to a wifi from the CLI.

```sh
pacman -S networkmanager

# Run it on startup
systemctl start NetworkManager
systemctl enable NetworkManager
```

<next-block title="Let's install some desktop apps."></next-block>

## Install even more packages

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
pacman -S \
  gdm \
  gnome

# Enable GDM on startup
sudo systemctl enable gdm
```

<next-block title="Let's create the user you'll be logging in with."></next-block>

## Create your user

### Create your user

<!-- {.-literate-style} -->

You'll need a user that you'll be logging in with for your day-to-day. (Be sure to change `yourname` to whatever you feel like using.)

```sh
# Create the user
useradd yourname
#       ^^^^^^^^
```

### Create the home dir

<!-- {.-literate-style} -->

`useradd` doesn't create a home directory, so do that now.

```sh
# Create their home dir
mkdir /home/yourname
#           ^^^^^^^^
chown yourname:yourname /home/yourname
#     ^^^^^^^^ ^^^^^^^^       ^^^^^^^^
```

### Set a password

<!-- {.-literate-style} -->

Set a password.

```sh
passwd yourname
#      ^^^^^^^^
```

### Add to the admin group

<!-- {.-literate-style} -->

The admin group is named `wheel`.

```sh
usermod -a -G wheel yourname
#                   ^^^^^^^^
```

### Add to other groups

<!-- {.-literate-style} -->

Tip: You'll want to add them eventually to other groups too.

```sh
usermod -a -G \
  audio,input,video,network,rfkill \
  yourname
# ^^^^^^^^
```

<next-block title="Let's install sudo."></next-block>

## Set up sudo

`sudo` is not part of the Arch Linux `base` package, so we'll need to install that separately.

### Install sudo

<!-- {.-literate-style} -->

Add and configure the `sudo` package to grant your user some superuser rights.

```sh
# Install sudo
pacman -S sudo
```

### Add sudo rights to your username

<!-- {.-literate-style} -->

Use `visudo` to edit the sudo config to add your user name in it.

```sh
# Update config
EDITOR=vi visudo
```

```sh
# Then add this line to the end of the file:
yourname ALL=(ALL) ALL
```

<next-block title="Let's set up your swap file."></next-block>

## Creating swap

### Set up your swap file

<!-- {.-literate-style} -->

If you skipped creating a swap partition, you can create a [Swap file](https://wiki.archlinux.org/index.php/Swap#Swap_file) instead.

```sh
# Create an 8gig swap
fallocate -l 8G /swapfile
#            ^^

# Format it, and turn it on
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

### Mount it on startup

<!-- {.-literate-style} -->

Add your swapfile to `/etc/fstab` so it'll be used on every boot.

```sh
# Edit your fstab partitions
vim /etc/fstab
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
cd
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

<next-block title="Let's create your default user."></next-block>


## You're quite done!

###

<!-- {.-literate-style} -->

If you're reading this guide while installing Arch Linux, then you should be done at this point! Remove your USB drive, `exit`, and then `reboot`. You may need to go to your BIOS's boot order config to boot to your new installation.

```sh
exit

reboot
```
