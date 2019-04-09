---
title: Managing Wi-Fi connections in Arch Linux with netctl
tags: [Linux]
date: 2019-04-11
---

###

<!-- {.-literate-style} -->

Many desktop systems rely on [NetworkManager], but this isn't the only way to get a Linux system online. Arch Linux comes with [netctl]&mdash;a systemd-native way of managing physical network connections.

<figure class='-no-pad'>
<img src='https://source.unsplash.com/2mVEwwcao_Y/600x300' alt='Unrelated photo'>
</figure>

[netctl]: https://wiki.archlinux.org/index.php/netctl
[networkmanager]: https://wiki.archlinux.org/index.php/NetworkManager

## Connecting to Wi-Fi

###

<!-- {.-literate-style} -->

Use `wifi-menu` to set up a profile. Running it will bring a CLI menu of nearby Wi-Fi networks.

```sh
sudo wifi-menu
```

### What's wifi-menu?

<!-- {.-literate-style} -->

The `wifi-menu` is a utility to create netctl profiles. After selecting a network in wifi-menu, a profile will be created in `/etc/netctl`. After creating a profile, wifi-menu will automatically try to connect to it.

<figure>
<img src='https://i.stack.imgur.com/ySl7b.png' />
</figure>

Only do this once per Wi-Fi network! After the profile's been created, you can connect to it without wifi-menu.

### Connecting to profile manually

<!-- {.-literate-style} -->

After creating a profile, you can connect to it using `netctl start <name>`. The _name_ is the name you provided in wifi-menu.

```bash

sudo netctl start wlp3s0-PrettyFly
```

<!-- {.-command} -->

```
(no output)
```

### Listing profiles

<!-- {.-literate-style} -->

Use `netctl list` to show what profiles have been created before.

```bash
sudo netctl list
```

<!-- {.-command} -->

```sh
wlp3s0-PrettyFly
wlp3s0-Mashup Garage 2.4Ghz
wlp3s0-Mashup Garage 5Ghz
```

## Managing connections

###

<!-- {.-literate-style} -->

Check for the status using `iw dev`&mdash;this will list of your physical devices. This should show you what SSID you're connected to, if any.

```sh
iw dev
```

<!-- {.-command} -->

```nohighlight
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
sudo netctl enable wlp3s0-PrettyFly
```


<!-- {.-command} -->

```
'/etc/systemd/systemd/multi-user.target.wants/netctl@wlp3s0\x2dPrettyFly.service' -> /usr/bin/systemd/netctl@service
generated '/etc/sstemd/systemd/multi-user.target.wants/netctl@wlp3s0\x2dPrettyFly.service.d/profile.cnof'
```

##

### References

- [Wireless network configuration](https://wiki.archlinux.org/index.php/Wireless_network_configuration) _(wiki.archlinux.org)_
