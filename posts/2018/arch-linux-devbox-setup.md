---
title: Setting up an Arch Linux dev box in the cloud
date: '2019-01-15'
tags: [Linux, Featured]
---

###

<!-- {.-wider-literate-style} -->

I do a lot of my day-to-day development work on a Linux VPS in the cloud. This lets me, say, run very taxing Rails projects without thrashing my laptop.

<figure class='-no-pad'>
<img src='https://source.unsplash.com/0juC5JIhPks/600x300' alt='Display' />
<figcaption>Believe it or not, Arch Linux can run on these.</figcaption>
</figure>

For this, I use the same OS as I use on my workstation: Arch Linux! In this article, I'll show you what I did to set up my on-the-cloud development box.

## Get an Arch Linux box

There are 3 providers I can suggest. They more or less have the same offerings; pick one that has the best latency to/from where you live and where you work.

### \$5 a month

<!-- {.-wider-literate-style} -->

For **\$5** a month, you can get 1GB RAM. This is okay to play around in, but for day-to-day use, I suggest getting the \$10 or \$20 plans.

<figure>

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 1 GB |  1x |   25 GB |
| [**Vultr**][vultr]               | 1 GB |  1x |   25 GB |
| [**DigitalOcean**][digitalocean] | 1 GB |  1x |   25 GB |

</figure>

### \$10 a month

<!-- {.-wider-literate-style} -->

For **\$10** a month, you can get 2GB RAM. CPU is limited to 1x though. It's alright for light day-to-day use.

<figure>

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 2 GB |  1x |   50 GB |
| [**Vultr**][vultr]               | 2 GB |  1x |   40 GB |
| [**DigitalOcean**][digitalocean] | 2 GB |  1x |   50 GB |

</figure>

### \$20 a month

<!-- {.-wider-literate-style} -->

For **\$20** a month, you can get 4GB RAM and 2x CPU. This is enough for most cases! While 4GB is a bit limited, you can set up a swap file on their really-fast SSD's.

<figure>

| Provider                         |  RAM | CPU | Storage |
| -------------------------------- | ---: | --: | ------: |
| [**Linode**][linode]             | 4 GB |  2x |   80 GB |
| [**Vultr**][vultr]               | 4 GB |  2x |   60 GB |
| [**DigitalOcean**][digitalocean] | 4 GB |  2x |   60 GB |

</figure>

[vultr]: https://www.vultr.com/
[linode]: https://www.linode.com/
[digitalocean]: https://www.digitalocean.com/

## Add user

###

<!-- {.-wider-literate-style} -->

Create your everyday user. For me, that's `rsc`, but change that as you need. You'll also want to set up sudo, of course, so let's do that.

```sh
# As root, add the user
useradd -Nm -g users -G wheel,sys rsc
passwd rsc
```

```sh
# Might as well change the root password.
# Later, you can use `su` to elevate your permissions.
passwd
```

## SSH setup

###

<!-- {.-wider-literate-style} -->

Make sure you can connect to it! After doing this, you can start connecting to your devbox via SSH, and do the rest of this setup via SSH.

```sh
# Let's assume the user `rsc`, if
# you're not that user yet.
su rsc
```

```sh
# Add ssh authorized key to ~/.ssh/authorized_keys
echo "ssh-rsa AAAAAHHLOLPUTYOURKEYHERE" | tee -a ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

```sh
# Generate our own key for later use
ssh-keygen
```

## Set up sudo

###

<!-- {.-wider-literate-style} -->

Arch Linux has no `sudo` by default. You can use the built-in `su`, but sudo is much more convenient.

```sh
# Set up sudo
pacman -Syu sudo
echo "%wheel ALL=(ALL) NOPASSWD: ALL" | EDITOR="tee -a" visudo
```

## Install packages

###

<!-- {.-wider-literate-style} -->

Install the packages you'd use on a day-to-day basis. Protip: [mosh](https://mosh.org/) is a great way to connect to your devbox.

```sh
sudo pacman -Syu \
  base-devel git mosh \
  yarn nodejs tmux fish exa vim neovim \
  fzf tig the_silver_searcher
```

## OpenVPN

###

<!-- {.-wider-literate-style} -->

Set up OpenVPN. I'm using the installer script [Angristan/OpenVPN-install](https://github.com/Angristan/OpenVPN-install) which will set up everything for you: openVPN, certificates, iptables, generate `.ovpn` files, and so on.

<figure>

```sh
# OpenVPN setup
curl -O https://raw.githubusercontent.com/Angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh
./openvpn-install.sh
```

<figcaption>Tip: Keep this script around, you'll use it to create more VPN credentials.</figcaption>

</figure>

## UFW firewall

###

<!-- {.-wider-literate-style} -->

We'll be using Uncomplicated Firewall to set up rules. We only want to expose 3 things to the outside world: SSH, Mosh, and OpenVPN.

```sh
sudo pacman -Syu ufw
```

### Set up rules

<!-- {.-wider-literate-style} -->

Let's set up some rules. We want to restrict incoming connections, and allow internal traffic to flow freely.

```sh
# UFW firewall rules: allow some internal traffic
sudo ufw default deny
sudo ufw allow from 10.8.0.0/24  # vpn network
sudo ufw route allow in on tun0 out on tun0  # dont block peer-to-peer
```

### Allow incoming services

<!-- {.-wider-literate-style} -->

Enable the services that you want accessible outside the VPN.

```sh
# Allow some services
sudo ufw limit ssh
sudo ufw allow mosh
```

### Make it work with Docker

<!-- {.-wider-literate-style} -->

You will need to add some overrides in `/etc/ufw/after.rules`. See this article for more info: [Solving ufw and Docker issues](https://github.com/chaifeng/ufw-docker/blob/master/README.md#solving-ufw-and-docker-issues).

```sh
# Read the linked article for the edits
# you will need to make here.
sudo vim /etc/ufw/after.rules
```

```sh
# As mentioned in the article above, you can open
# certain ports to the outside world using:
# (don't do this if you don't plan to open a webserver)
sudo ufw route allow proto tcp from any to any port 80
sudo ufw route allow proto tcp from any to any port 443
```

### Start the firewall

<!-- {.-wider-literate-style} -->

Start and enable your firewall.

<figure>

```sh
# Start and enable
sudo ufw enable
sudo systemctl enable ufw
sudo systemctl start ufw

# Check its status
sudo ufw status
```

<figcaption>
Tip: No need to allow OpenVPN connections yourself. The VPN installer installs its own iptables rules.
</figcaption>
</figure>

## Fail2ban

###

<!-- {.-wider-literate-style} -->

Use [fail2ban] to restrict SSH access to anyone trying to get in and failing to do so.

[fail2ban]: https://www.fail2ban.org/

```sh
sudo pacman -Syu fail2ban
```

### Configure fail2ban

<!-- {.-wider-literate-style} -->

Configure fail2ban to "jail" sshd connections. This will shut off SSH access to IP's that try to log in and fail.

```sh
nvim /etc/fail2ban/jail.d/sshd.local
```

```
[sshd]
enabled = true
```

### Start it

<!-- {.-wider-literate-style} -->

Start fail2ban and auto-start it on boot.

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## NFS server

###

<!-- {.-wider-literate-style} -->

You can use NFS to access your files from within the VPN. In this example above, we'll be sharing `/home/rsc/Dev` via NFS.

```sh
# Install nfs client and server (do this for your workstation too!)
sudo pacman -Syu nfs-utils
```

### Mount to /srv

<!-- {.-wider-literate-style} -->

Add mount point. We'll be serving things in `/srv` via NFS.

```sh
sudo mount --bind /home/rsc/Dev /srv/Dev
```

### Set up auto-mounting

<!-- {.-wider-literate-style} -->

Edit fstab to auto-mount this path on every boot up.

```sh
sudo vim /etc/fstab
```

```
/home/rsc/Dev /srv/Dev none rw,bind 0 0
```

### Tell nfsd about it

<!-- {.-wider-literate-style} -->

Edit nfs config to export this path.

```sh
sudo vim /etc/exports
```

```
/srv/Dev 10.8.0.0/24(rwsync)
```

### Reload your config

<!-- {.-wider-literate-style} -->

Make `/etc/exports` take effect.

```sh
sudo exportfs -arv
```

### Start it

<!-- {.-wider-literate-style} -->

Start and enable server.

```sh
sudo systemctl enable nfs-server
sudo systemctl start nfs-server
```

## Git setup

###

<!-- {.-wider-literate-style} -->

Configure Git like you typically would.

```sh
# Configure Git
git config --global url."git@github.com:".insteadOf "https://github.com/"
git config --global user.name "Rico Sta. Cruz"
git config --global user.email "rstacruz@users.noreply.github.com"
```

## Secure SSHD config

###

<!-- {.-wider-literate-style} -->

Secure your SSH server by disabling root login, and only allowing SSH keys.

```sh
sudo vim /etc/ssh/sshd_server
```

```
PermitRootLogin no
PasswordAuthentication no
```

## Rico's stuff

###

<!-- {.-wider-literate-style} -->

Here are some other suggestions.

```sh
# Install for puppeteer
yay chromium
```

```sh
# Change default shell
chsh -s /usr/bin/fish
```

## Workstation setup

### Set up hosts

<!-- {.-wider-literate-style} -->

In your laptop, it'd make sense to add the devbox IP to your `/etc/hosts`.

```sh
# /etc/hosts
```

```
# The local one works if you're connected to the VPN.
# Use this when accessing resources, eg `http://devbox.local:4000/`
devbox.local 10.8.0.1

# The remote one is the public IP address.
# Use this when connecting via mosh or ssh
devbox.remote 123.234.123.234
```

### Set up aliases

<!-- {.-wider-literate-style} -->

Set up an alias so you only have to type `A` to attach to your working session.

```sh
# for fish (type this in a shell)
abbr A 'mosh --experimental-remote-ip=remote rsc@devbox.remote -- sh -c "tmux attach || tmux"'

# or bash/zsh (add to your .bashrc or .zshrc)
alias A='mosh --experimental-remote-ip=remote rsc@devbox.remote -- sh -c "tmux attach || tmux"'
```

### Mounting NFS volumes

<!-- {.-wider-literate-style} -->

You can mount the NFS volumes. (Be sure to turn off Git prompts here, it gets slow)

```sh
# You also need nfs-utils in the client side
sudo pacman -Syu nfs-utils

# Mount into `/Devbox`
sudo mkdir -P /Devbox
sudo chown -R $(whoami) /Devbox
sudo mount -v devbox.local:/srv /Devbox
```
