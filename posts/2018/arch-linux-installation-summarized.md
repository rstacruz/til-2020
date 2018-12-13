---
title: Arch Linux installation, summarized
date: '2018-12-12'
tags: [Arch Linux]
---

Arch Linux has a great [Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide), but I personally found it very daunting and hard-to-read. This article is a summary of all the commands in that wiki page, as of time of writing.

**This is not a "How to Install Arch Linux" instruction guide.** It's not a replacement for official [Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide)­consider this more like a refresher course!

<next-block title="Let's get started."></next-block>

## First steps

### Change keyboard layout

<!-- {.-literate-style} -->

If you're using different keyboard layout, change it now using `loadkeys`. See [kbd](https://www.archlinux.org/packages/core/x86_64/kbd/files/) for a list of available layouts.

```sh
# Changes keyboard layout
# (Skip this step if you're using the qwerty layout!)

loadkeys dvorak
```

### Check if you're in UEFI mode

<!-- {.-literate-style} -->

Check if the `/sys/firmware/efi/efivars` path exists. If it is, you're using `UEFI` mode. If not, you're using `Legacy` mode. Most modern devices are using UEFI mode, and this guide assumes you're in UEFI mode.

```sh
# See if this path exists
ls /sys/firmware/efi/efivars
```

<next-block title="Let's connect to the Internet."></next-block>

## Go online

You will be installing packages from the Arch package repository over the Internet. For that, you'll need to be online.

### Connect to the Internet via Android tethering

<!-- {.-literate-style} -->

If you have an Android phone, this is the easiest way to go online. Connect your phone to your computer, then **Settings** → **Tethering & Mobile Hotspot** → **USB Tethering** (it's disabled unless your phone is connected). Then connect to it using `dhcpcd`.

```sh
# Find interface names:
ls /sys/class/net

# Then enable it:
dhcpcd enp0s26f7u3u3
#      ^^^^^^^^^^^^^
#      replace this with the
#      actual interface name
```

See [Android tethering](https://wiki.archlinux.org/index.php/Android_tethering) for info. For other ways to go online, see [Network configuration](https://wiki.archlinux.org/index.php/Network_configuration).

### See if you're online

<!-- {.-literate-style} -->

After all that, ensure that you're finally online.

```sh
# Are we online? Hopefully yes!
ping 8.8.8.8
```

<next-block title="Update your system clock."></next-block>

## System clock

### Update system time

<!-- {.-literate-style} -->

This will update your system clock through the Internet via NTP (Network Time Protocol).

```sh
# Enable ntp time updates
timedatectl set-ntp true
```

<next-block title="Partition your disk."></next-block>

## Disks

You'll need 2 partitions on your computer. You'll need an `EFI partition`, which you already have (and can be reused) if you already have another OS installed. You'll also need an `ext4 partition` for Arch Linux to be installed to.

### Partition the disks

<!-- {.-literate-style} -->

I recommend using `parted` for this. See [Partition the disks](https://wiki.archlinux.org/index.php/Installation_guide#Partition_the_disks) _(wiki.archlinux.org)_ for more info. You'll need to create an `ext4` partition.

```sh
parted
# Important: read the guide above on
# how to use `parted`!
```

### Format disks

<!-- {.-literate-style} -->

Format any _ext4_ partitions you made using `mkfs.ext4`. Be sure to replace `sda1` with the actual partition.

```sh
# Format a partition as ext4
mkfs.ext4 /dev/sda1
#              ^^^^
```

### Format swaps

<!-- {.-literate-style} -->

_(Optional)_ If you made a swap partition, use _mkswap_ to format them. Be sure to replace `sda3` with the actual partition.

```sh
# Format a partition as swap space
mkswap /dev/sda3
#           ^^^^

# Enable it
swapon /dev/sda3
#           ^^^^
```

<next-block title="Let's mount the partitions you just made."></next-block>

## Mount the partitions

After creating your partitions, you'll now need to mount it so we can write to it.

### Mount the root partition

<!-- {.-literate-style} -->

Mount the root partition to `/mnt`.

```sh
mount /dev/sda1 /mnt
#          ^^^^
```

### Mount the EFI partition

<!-- {.-literate-style} -->

Mount the EFI partition to `/mnt/boot`.

```sh
mkdir /mnt/boot
mount /dev/sda2 /mnt/boot
#          ^^^^
```

<next-block title="Time to actually install Arch Linux."></next-block>

## Installing Arch Linux

### Use your closest mirror

<!-- {.-literate-style} -->

Edit your mirror list, and move the geographically-closest location to you up the list. Don't skip this step! It'll likely be the difference between a 45-minute install and a 5-minute install.

```bash
# Find your closest country, and bring it up
vi /etc/pacman.d/mirrorlist
```

### Install packages

<!-- {.-literate-style} -->

Install packages using `pacstrap`. This will take a while!

```bash
# Make some coffee while this is happening
pacstrap /mnt base
```

### Configure list of partitions

<!-- {.-literate-style} -->

Generate the list of partitions (`/etc/fstab`) to be mounted at boot time. This will be based on what partitions are already mounted right now.

```bash
# Generate fstab
genfstab -U /mnt >> /mnt/etc/fstab
```

<next-block title="Let's enter the system."></next-block>

## Chrooting in

###

<!-- {.-literate-style} -->

We're going to "enter" the new system you just mounted using [chroot](https://en.m.wikipedia.org/wiki/Chroot)! Use `arch-chroot` to "enter" the new file system. This will make root path (`/`) be what's in the new partition (until you `exit`).

```bash
# ~Enter the system~
arch-chroot /mnt
```

<next-block title="Let's configure the rest of the stuff."></next-block>

## Once in chroot

### Set your timezone

<!-- {.-literate-style} -->

See [tzdata](https://www.archlinux.org/packages/core/x86_64/tzdata/) for a list of available timezones.

```bash
# Set your timezone (eg, Asia/Manila)
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
#                          ^^^^^^^^^^^

# Update time config (/etc/adjclock)
hwclock --systohc
```

### Set up locales

<!-- {.-literate-style} -->

Set your default locale. For most of us, that would be `en_US.UTF-8`, but feel free to change that.

```bash
# Uncomment `en_US.UTF-8 UTF-8` in this file
vi /etc/locale.gen

# Generate locale config (/etc/locale.gen)
locale-gen
```

### Set keyboard layout

<!-- {.-literate-style} -->

_(Optional)_ If you use a different keyboard layout, make it persist on boot.

```bash
# Skip this step if you're not using
# an alternate keyboard layout.
echo "KEYMAP=dvorak" > /etc/vconsole.conf
```

<next-block title="Set your system's hostname"></next-block>

## Hostname

It's time to pick a name for your machine.

### Set hostname

<!-- {.-literate-style} -->

Pick a hostname and update `/etc/hostname`.

```sh
echo "myhostname" > /etc/hostname
#     ^^^^^^^^^^
#     change this to whatever
#     you feel like using
```

### Update etc/hosts

<!-- {.-literate-style} -->

Update `/etc/hosts` with your new hostname. (Be sure to change `myhostname` to your chosen hostname.)

```sh
vi /etc/hosts
# Then update it to:

127.0.0.1 localhost
::1 localhost
127.0.1.1 myhostname.localdomain myhostname
```

### Change root password

<!-- {.-literate-style} -->

Change your password using `passwd`. This is _not_ your main user's password.

```
passwd
```

<next-block title="Let's install a boot loader."></next-block>

## Install a bootloader

You'll need a boot loader in your EFI partition. Think of this as a small program whose sole purpose is to kickstart your Linux session. There are many different boot loaders, but [GRUB](https://wiki.archlinux.org/index.php/GRUB) would be a good one to start with.

### Mount your other OS's

<!-- {.-literate-style} -->

If you have other OS's installed (eg, Windows), mount them now! This is not strictly necessary, but if you're going to install GRUB, this will let GRUB know that you have another OS in your system.

```bash
# (Skip this step if you're not dual-booting.)
# For example, if you have Windows in /dev/sda4:
mkdir /windows
mount /dev/sda4 /windows
```

### Install GRUB

<!-- {.-literate-style} -->

Let's install grub into `/boot`. Be sure to read the Arch wiki, instructions may be different for your system!

```bash
# Install grub
pacman -S grub efibootmgr

# Install GRUB
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB

# Update Grub config
grub-mkconfig -o /boot/grub/grub.cfg
```

<next-block title="Let's create the user you'll be logging in with."></next-block>

## Create your user

_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

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

You'll want to add them to some other groups too.

```sh
usermod -a -G \
  audio,input,video,network,rfkill \
  yourname
# ^^^^^^^^
```

<next-block title="Let's install sudo."></next-block>

## Set up sudo

`sudo` is not part of the Arch Linux `base` package, so we'll need to install that separately.
_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

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

<next-block title="Install some packages."></next-block>

## Install some extra packages

_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

### Networking tools

<!-- {.-literate-style} -->

Install some networking tools, so we may be able to go online later. [NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) is used by most desktop environments to manage network connections, and can be used in the console as well via `nmtui`.

```bash
pacman -S networkmanager
systemctl enable networkmanager
```

<next-block title="Your mostly done! Lets do a few more things."></next-block>

## You're mostly done!

###

<!-- {.-literate-style} -->

Congratulations, you now have a working Arch Linux installation. At this point, `exit` out of the chroot, and `reboot`. Be sure to remove the USB drive as you're rebooting, and you may need to go to your BIOS's boot order menu.

```
exit

reboot
```

###

From here, I recommend proceeding to the [**After Installing Arch Linux**](/after-installing-arch-linux/) guide. A basic Arch Linux installation doesn't have a user, swap, a desktop environment, sudo, and many other facilities we may be taking for granted.
