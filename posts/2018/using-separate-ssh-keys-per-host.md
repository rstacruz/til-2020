---
title: Using separate SSH keys per host
tags: [Development, Linux]
date: 2019-02-13
---

It's a good idea to keep a different key for every host. That way, should one be compromised, you're not compromising your access to all your hosts. An easy way to do this is to configure your SSH to automatically look for the key based on the host you're connecting to.

##

### Configure your SSH client

<!-- {.-literate-style} -->

Edit the file `~/.ssh/config` and add this `Host *` rule in. Whenever SSH connects to a host, it will now look for a corresponding key in `~/.ssh/key/<user>@<host>`.

```sh
vim ~/.ssh/config
```

```sh
Host *
  IdentityFile ~/.ssh/keys/%r@%h
```

### Organize your keys

<!-- {.-literate-style} -->

Put your SSH keys in `~/.ssh/keys/` in the format of `<user>@<host>`. My key folder looks a little bit something like this.

```sh
ls ~/.ssh/keys
```

```
git@github.com
git@github.com.pub
rico@staging.server.com
rico@staging.server.com.pub
rsc@10.8.0.1
rsc@10.8.0.1.pub
```

### You're done!

<!-- {.-literate-style} -->

Try it out by connecting to a host that you have a key for.

```sh
ssh git@github.com
```

```sh
Hi rstacruz! You've successfully authenticated, but
GitHub does not provide shell access.
Connection to github.com closed.
```

## Bonus

### Generating keys

<!-- {.-literate-style} -->

To create new keys, simply use `ssh-keygen`. When prompted for where to place files, put them in `<HOME>/.ssh/keys/user@host`. Here's an example.

```sh
ssh-keygen
```

```sh
Generating public/private rsa key pair.
Enter file in which to save the key: /home/rsc/.ssh/keys/git@bitbucket.org
Enter passphrase
...
```
