---
title: Setting up an Arch Linux dev box
date: '2019-01-15'
tags: [Arch Linux]
draft: true
---

Hey.

## Get an Arch Linux box

There are 3 providers I can suggest. They more or less have the same offerings; pick one that has the best latency to/from where you live and where you work.

### \$5 a month

For **\$5** a month, you can get:

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 1 GB |  1x |   25 GB |
| [**Vultr**][vultr]               | 1 GB |  1x |   25 GB |
| [**DigitalOcean**][digitalocean] | 1 GB |  1x |   25 GB |

### \$10 a month

For **\$10** a month, you can get:

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 2 GB |  1x |   50 GB |
| [**Vultr**][vultr]               | 2 GB |  1x |   40 GB |
| [**DigitalOcean**][digitalocean] | 2 GB |  1x |   50 GB |

### \$20 a month

For **\$20** a month, you can get:

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 4 GB |  2x |   80 GB |
| [**Vultr**][vultr]               | 4 GB |  2x |   60 GB |
| [**DigitalOcean**][digitalocean] | 4 GB |  2x |   60 GB |

[vultr]: https://www.vultr.com/
[linode]: https://www.linode.com/
[digitalocean]: https://www.digitalocean.com/

## Add user

###

<!-- {.-literate-style} -->

Create your everyday user. For me, that's `rsc`, but change that as you need. You'll also want to set up sudo, of course, so let's do that.

```sh
# As root, add the user
useradd -Nm -g users -G wheel,sys rsc
passwd rsc

# Might as well change the root password.
# Later, you can use `su` to elevate your permissions.
passwd
```

## SSH setup

###

<!-- {.-literate-style} -->

Make sure you can connect to it! After doing this, you can start connecting to your devbox via SSH, and do the rest of this setup via SSH.

```sh
# Let's assume the user `rsc`, if
# you're not that user yet.
su rsc

# Add ssh authorized key to ~/.ssh/authorized_keys
echo "ssh-rsa AAAAAHHLOLPUTYOURKEYHERE" | tee -a ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Generate our own key for later use
ssh-keygen
```

## Set up sudo

###

<!-- {.-literate-style} -->

Arch Linux has no `sudo` by default. You can use the built-in `su`, but sudo is much more convenient.

```sh
# Set up sudo
pacman -Syu sudo
echo "%wheel ALL=(ALL) NOPASSWD: ALL" | EDITOR="tee -a" visudo
```

## Install packages

###

<!-- {.-literate-style} -->

Install the packages you'd use on a day-to-day basis. Protip: [mosh](https://mosh.org/) is a great way to connect to your devbox.

```sh
sudo pacman -Syu \
  base-devel git mosh \
  yarn nodejs tmux fish exa vim neovim \
  fzf tig the_silver_searcher
```

## OpenVPN

###

<!-- {.-literate-style} -->

Set up OpenVPN. I'm using the installer script [Angristan/OpenVPN-install](https://github.com/Angristan/OpenVPN-install) which will set up everything for you: openVPN, certificates, iptables, generate `.ovpn` files, and so on.

```sh
# OpenVPN setup
curl -O https://raw.githubusercontent.com/Angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh
./openvpn-install.sh
```

> Tip: Keep this script around, you'll use it to create more VPN credentials.

### Also see

- [Angristan/OpenVPN-install](https://github.com/Angristan/OpenVPN-install)

## UFW firewall

###

<!-- {.-literate-style} -->

We'll be using Uncomplicated Firewall to set up rules. We only want to expose 3 things to the outside world: SSH, Mosh, and OpenVPN.

```sh
sudo pacman -Syu ufw
```

###

<!-- {.-literate-style} -->

Let's set up some rules. We want to restrict incoming connections, and allow internal traffic to flow freely.

```sh
# UFW firewall rules: allow some internal traffic
sudo ufw default deny
sudo ufw allow from 10.8.0.0/24  # vpn network
sudo ufw route allow in on tun0 out on tun0  # dont block peer-to-peer
```

```sh
# Allow some services
sudo ufw limit ssh
sudo ufw allow mosh
```

## Make it work with Docker

You will need to add some overrides in `/etc/ufw/after.rules`. See this article for more info: [Solving ufw and Docker issues](https://github.com/chaifeng/ufw-docker/blob/master/README.md#solving-ufw-and-docker-issues).

```sh
# Read the linked article for the edits
# you will need to make here.
sudo vim /etc/ufw/after.rules
```

###

<!-- {.-literate-style} -->

Start and enable your firewall.

```sh
# Start and enable
sudo ufw enable
sudo systemctl enable ufw
sudo systemctl start ufw

# Check its status
sudo ufw status
```

> Tip: No need to allow OpenVPN connections yourself. The VPN installer installs its own iptables rules.

## Docker support for UFW

###

<!-- {.-literate-style} -->

Docker-compose makes its own iptables rules. These rules allow traffic from everywhere (`0.0.0.0`) to reach your Docker containers. This is usually good, but not for development machines.

```sh
echo "{ \"iptables\": false }" | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker
```

We'll disable iptables support for Docker. Instead, we'll use the ufw rules above to manage this.

### Also see

Here are some further reading on this topic:

- https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw/
- https://www.techrepublic.com/article/how-to-fix-the-docker-and-ufw-security-flaw/
- https://www.mkubaczyk.com/2017/09/05/force-docker-not-bypass-ufw-rules-ubuntu-16-04/

## Fail2ban

###

<!-- {.-literate-style} -->

Use [fail2ban] to restrict SSH access to anyone trying to get in and failing to do so.

[fail2ban]: https://www.fail2ban.org/

```sh
sudo pacman -Syu fail2ban
```

###

<!-- {.-literate-style} -->

Configure fail2ban to "jail" sshd connections.

```sh
nvim /etc/fail2ban/jail.d/sshd.local
```

```
[sshd]
enabled = true
```

###

<!-- {.-literate-style} -->

Start fail2ban and auto-start it on boot.

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## NFS server

You can use NFS to access your files from within the VPN. In this example above, we'll be sharing `/home/rsc/Dev` via NFS.

```sh
# Install nfs client and server (do this for your workstation too!)
sudo pacman -Syu nfs-utils
```

```sh
# Add mount point
sudo mount --bind /home/rsc/Dev /srv/Dev
```

```sh
# Edit fstab to auto-mount it on boot up
sudo vim /etc/fstab
```

> ```
> /home/rsc/Dev /srv/Dev none rw,bind 0 0
> ```

```sh
# Edit nfs config to export this path
sudo vim /etc/exports
```

> ```
> /srv/Dev 10.8.0.0/24(rwsync)
> ```

```sh
# Make /etc/exports take effect
sudo exportfs -arv
```

```sh
# Start and enable server
sudo systemctl enable nfs-server
sudo systemctl start nfs-server
```

## Git setup

Configure Git.

```sh
# Configure Git
git config --global url."git@github.com:".insteadOf "https://github.com/"
git config --global user.name "Rico Sta. Cruz"
git config --global user.email "rstacruz@users.noreply.github.com"
```

## Secure SSHD config

```sh
sudo vim /etc/ssh/sshd_server
```

> ```
> PermitRootLogin no
> PasswordAuthentication no
> ```

## Rico's stuff

```sh
# Install for puppeteer
yay chromium
```

```sh
# Change default shell
chsh -s /usr/bin/fish
```

## Workstation setup

In your laptop, it'd make sense to add the devbox IP to your `/etc/hosts`.

```sh
# /etc/hosts

# The local one works if you're connected to the VPN.
# Use this when accessing resources, eg `http://devbox.local:4000/`
devbox.local 10.8.0.1

# The remote one is the public IP address.
# Use this when connecting via mosh or ssh
devbox.remote 123.234.123.234
```

Set up an alias so you only have to type `A` to attach to your working session.

```sh
# for fish (type this in a shell)
abbr A 'mosh --experimental-remote-ip=remote rsc@devbox.remote -- sh -c "tmux attach || tmux"'

# or bash/zsh (add to your .bashrc or .zshrc)
alias A='mosh --experimental-remote-ip=remote rsc@devbox.remote -- sh -c "tmux attach || tmux"'
```

You can mount the NFS. (Be sure to turn off Git prompts here, it gets slow)

```sh
# You also need nfs-utils in the client side
sudo pacman -Syu nfs-utils

# Mount into `/Devbox`
sudo mkdir -P /Devbox
sudo chown -R $(whoami) /Devbox
sudo mount -v devbox.local:/srv /Devbox
```
