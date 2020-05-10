---
title: Managing Wi-Fi connections in Arch Linux with netctl
tags: [Linux]
layout: simple
date: 2019-04-11
---

Many desktop systems rely on [NetworkManager], but this isn't the only way to get a Linux system online. Arch Linux comes with [netctl]&mdash;a systemd-native way of managing physical network connections.

<Figure code title='TLDR'>

```sh
# Open a menu to find Wi-Fi connections.
# This creates a profile and connects to it
sudo wifi-menu

# Auto connect on boot
# (Assuming 'wlp3s0' is your interface name)
sudo systemctl enable netctl-auto@wlp3s0.service

# Set it to auto-connect on boot
sudo netctl-auto enable wlp3s0-WifiNameHere

# To manuall yconnect to a wifi network:
sudo netctl-auto switch-to wlp3s0-WifiNameHere
```

</Figure>

---

## Connecting to Wi-Fi

###

<!-- {.-literate-style} -->

Use `wifi-menu` to set up a profile. Running it will bring a CLI menu of nearby Wi-Fi networks.

```sh
sudo wifi-menu
```

### What's wifi-menu?

The `wifi-menu` is a utility to create netctl profiles. After selecting a network in wifi-menu, a profile will be created in `/etc/netctl`. After creating a profile, wifi-menu will automatically try to connect to it.

<Figure>
<img src='https://i.stack.imgur.com/ySl7b.png' />
</Figure>

Only do this once per Wi-Fi network! After the profile's been created, you can connect to it without wifi-menu.

### Enabling auto-roaming mode

Enable the `netctl-auto@<interface>` service to automatically connect to networks as they become in range. You may need to edit the profile files for this; check the ([wiki entry](https://wiki.archlinux.org/index.php/netctl#Wireless)) for more info.

```sh
sudo systemctl enable netctl-auto@wlp3s0.service
```

### Connecting to profile manually

<!-- {.-literate-style} -->

After creating a profile, you can connect to it using `netctl switch-to <name>`. The _name_ is the name you provided in wifi-menu.

```bash
sudo netctl-auto switch-to wlp3s0-PrettyFly
```

### Listing profiles

<!-- {.-literate-style} -->

Use `netctl-auto list` to show what profiles have been created before.

```bash
$ sudo netctl-auto list

	wlp3s0-PrettyFly
	wlp3s0-Mashup Garage 2.4Ghz
	wlp3s0-Mashup Garage 5Ghz
```

## Managing connections

Check for the status using `iw dev`&mdash;this will list of your physical devices. This should show you what SSID you're connected to, if any.

```sh
$ iw dev

	phy#0
		Interface wlp3s0
			ifindex 2
			wdev 0x1
			addr e0:ac:ab:3f:db:ee
			ssid PrettyFly
			type managed
```

### Auto-connecting a profile

<!-- {.-literate-style} -->

Use `netctl enable` to "enable" a profile. This creates and enables a systemd service, which is invoked on every bootup.

```sh
$ sudo netctl enable wlp3s0-PrettyFly

	'/etc/systemd/systemd/multi-user.target.wants/netctl@wlp3s0\x2dPrettyFly.service' -> /usr/bin/systemd/netctl@service
	generated '/etc/sstemd/systemd/multi-user.target.wants/netctl@wlp3s0\x2dPrettyFly.service.d/profile.cnof'
```

## Why use netctl?

For the most part, I find [NetworkManager] to be a preferrable choice over `netctl` for desktop systems. It works, it integrates with GNOME and Plasma, it has a lot of user interfaces (`nmtui` being my favorite&mdash;a CLI version!), has support for OpenVPN, and many more.

With that said, I've been trying to use netctl instead lately for one silly reason: it _seems_ to wake up faster from sleep! This only happens on my MacBook Air though, I've found NetworkManager to connect pretty fast in other systems.

There's also something to be said about going with a slimmer setup. Netctl seems a little closer to the metal than NetworkManager, and comes built-in as part of the `base` package in Arch Linux.

## Epilogue

Thanks for reading my article! I've done some edits since this was first published.

- Use `netctl-auto` instead of `netctl`. This gets you the benefits of "roaming" (auto-switching connections) and more.

- Removed the use of `netctl enable <profile>`. This works, but will make your boot time slower (Arch will wait for the connection to become successful before finishing the boot process).

## References

- [Wireless network configuration](https://wiki.archlinux.org/index.php/Wireless_network_configuration) _(wiki.archlinux.org)_
- [netctl](https://wiki.archlinux.org/index.php/netctl) _(wiki.archlinux.org)_

[netctl]: https://wiki.archlinux.org/index.php/netctl
[networkmanager]: https://wiki.archlinux.org/index.php/NetworkManager
