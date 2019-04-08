---
title: Demystifying Arch Linux installation
date: '2018-12-12'
tags: [Linux, Featured]
---

###

<!-- {.-wider-literate-style} -->

Arch Linux's wiki has a great [installation guide](https://wiki.archlinux.org/index.php/Installation_guide), but some find it very daunting and hard-to-read. This article is a summary of all the commands in that wiki page, as of time of writing.

<figure class='-no-pad'>
<img src='https://source.unsplash.com/666lawaMlFA/600x300' alt='Display'>
<figcaption>This photo isn't related to Arch Linux in any way.</figcaption>
</figure>

**This is not a replacement for the the official [Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide).** Consider this more like a refresher course!

<next-block title="Let's get started."></next-block>

## Before everything

### Resize your volumes

<!-- {.-literate-style} -->

_(Skip this step if you're not dual-booting Windows or MacOS.)_ Before you create your `ext4` (Linux) partition, you'll need make space for it. Resize your current OS's partition down at least 60GB less to give you some space to create your Linux partition.

<figure>

**Windows users,** [Follow this guide](https://www.disk-partition.com/resource/resize-NTFS-partition-windows.html) to resize your partition in Windows using the built-in _Disk Management_.

</figure>

<figure>

**MacOS users,** [Follow this guide](http://osxdaily.com/2009/11/20/resize-partitions-in-mac-os-x-with-disk-utility/) in using _Disk Utility.app_ to resize your partition.

</figure>

## Create a boot disk

<!-- {.-literate-style} -->

You can download the latest ArchLinux ISO from the [Arch Linux Downloads](https://www.archlinux.org/download/) page. To create these USB disks, you can use [dd](https://wiki.archlinux.org/index.php/USB_flash_installation_media#Using_dd) in Linux, [RUFUS](https://wiki.archlinux.org/index.php/USB_flash_installation_media#Using_Rufus) in Windows, or [dd](https://wiki.archlinux.org/index.php/USB_flash_installation_media#In_macOS) in MacOS.

### Boot into your disk

<!-- {.-literate-style} -->

Boot into your USB disk. It should land you onto a bash prompt. When you see this, it's time to get started!

```
[root@archiso /]#
```

<!-- {.-terminal} -->

<next-block title="Let's type in a few commands."></next-block>

## First steps

### Change keyboard layout

<!-- {.-literate-style} -->

If you're using different keyboard layout, change it now using `loadkeys`. See [kbd](https://www.archlinux.org/packages/core/x86_64/kbd/files/) for a list of available layouts.

```sh
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

### Connect to WiFi

<!-- {.-literate-style} -->

Try going online by typing `wifi-menu`. (If this didn't work, have a look at [other ways](https://github.com/rstacruz/arch-installer/blob/master/docs/getting_online.md) of getting online.)

```sh
# Connect to the Internet via Wi-Fi
wifi-menu
```

### Are we online yet?

<!-- {.-literate-style} -->

After all that, ensure that you're finally online.

```sh
# Check if you're online now
ping 8.8.8.8
```

<next-block title="Update your system clock."></next-block>

## System clock

###

<!-- {.-literate-style} -->

This will update your system clock through the Internet via NTP (Network Time Protocol).

```sh
# Update your system time
timedatectl set-ntp true
```

<next-block title="Partition your disk."></next-block>

## Disks

You'll need 2 partitions on your computer. You'll need an `EFI partition`, which you already have (and can be reused) if you already have another OS installed. You'll also need an `ext4 partition` for Arch Linux to be installed to.

### Using cfdisk

<!-- {.-literate-style} -->

I recommend using `cfdisk` for this. See [Partition the disks](https://wiki.archlinux.org/index.php/Installation_guide#Partition_the_disks) _(wiki.archlinux.org)_ for more info.

```sh
# Create your ext4 partition using 'cfdisk'
cfdisk /dev/sda
```

You'll need to create an `ext4` partition. You'll also need an `efi` partition, but you probably have that already if you have an OS installed before all this.

Unlike other guides, I recommend _not_ setting up a swap partition, and using [systemd-swap] instead (we'll set that up later on).

[systemd-swap]: https://wiki.archlinux.org/index.php/Swap#systemd-swap

### Formatting your disk

<!-- {.-literate-style} -->

Format any _ext4_ partitions you made using `mkfs.ext4`. Be sure to replace `sda1` with the actual partition.

```sh
# Format a partition as ext4
mkfs.ext4 /dev/sda1
#              ^^^^
```

<next-block title="Let's mount the partitions you just made."></next-block>

## Mount the partitions

After creating your partitions, you'll now need to mount it so we can write to it.

###

<!-- {.-literate-style} -->

Mount the root partition to `/mnt`. This is the ext4 partition that'll be installing Linux into.

```sh
mount /dev/sda1 /mnt
#          ^^^^
```

###

<!-- {.-literate-style} -->

Mount the EFI partition to `/mnt/boot`. This is where the bootloader will be installed.

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
```

```bash
# Update time config (/etc/adjclock)
hwclock --systohc
```

### Set up locales

<!-- {.-literate-style} -->

Set your default locale. For most of us, that would be `en_US.UTF-8`, but feel free to change that.

```bash
# Uncomment `en_US.UTF-8 UTF-8` in this file
vi /etc/locale.gen
```

```bash
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

###

<!-- {.-literate-style} -->

It's time to pick a name for your machine. Pick a hostname and update `/etc/hostname`.

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
```

```
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

### Install GRUB

<!-- {.-literate-style} -->

Let's install grub into `/boot`. Be sure to read the Arch wiki, instructions may be different for your system!

```bash
# Install packages
pacman -S grub efibootmgr
```

```bash
# Install GRUB to EFI
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

```bash
# Update Grub config
grub-mkconfig -o /boot/grub/grub.cfg
```

<next-block title="Let's create the user you'll be logging in with."></next-block>

## Create your user

_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

###

<!-- {.-literate-style} -->

You'll need a user that you'll be logging in with for your day-to-day. (Be sure to change `yourname` to whatever you feel like using.)

```sh
# Create the user
useradd -Nm -g users -G wheel,sys yourname
#                                 ^^^^^^^^
```

### Change the password

<!-- {.-literate-style} -->

Set a password using `passwd`.

```sh
passwd yourname
```

```
New password: ····
Retype new password: ····
passwd: password updated successfully
```

### Add to groups

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

The [sudo] utility lets your everyday user run system admin tasks. Sudo is not part of the Arch Linux `base` package, so we'll need to install that separately.
_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

[sudo]: https://wiki.archlinux.org/index.php/Sudo

### Install sudo

<!-- {.-literate-style} -->

Add and configure the `sudo` package to grant your user some superuser rights.

```sh
# Install sudo
pacman -S sudo
```

### Add sudo rights to your username

<!-- {.-literate-style} -->

Use `visudo` to edit the sudo config to add the `wheel` group to it. This allows all users in that group to use sudo. (You did add your user to `wheel`, right?)

```sh
# Update config
EDITOR=vi visudo
```

```sh
# Then add this line to the end of the file:
%wheel ALL=(ALL) ALL
```

<next-block title="Install some packages."></next-block>

## Install some extra packages

_(This section is not listed in the Arch official installation guide, but I highly recommended this for most users.)_

###

<!-- {.-literate-style} -->

Install some networking tools, so we may be able to go online later. [NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) is used by most desktop environments to manage network connections, and can be used in the console as well via `nmtui`.

```bash
# Install NetworkManager to manage your networks
pacman -S networkmanager
systemctl enable NetworkManager
```

<next-block title="Your mostly done! Lets do a few more things."></next-block>

## You're mostly done!

###

<!-- {.-literate-style} -->

Congratulations, you now have a working Arch Linux installation. At this point, `exit` out of the chroot, and `reboot`. Be sure to remove the USB drive as you're rebooting, and you may need to go to your BIOS's boot order menu.

```
exit
```

```
reboot
```

###

<!-- {.-literate-style} -->

From here, I recommend proceeding to the [**After Installing Arch Linux**](/after-installing-arch-linux/) guide. A basic Arch Linux installation doesn't have a user, swap, a desktop environment, sudo, and many other facilities we may be taking for granted.
