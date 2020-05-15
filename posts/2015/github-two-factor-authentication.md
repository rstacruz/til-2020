---
date: '2015-03-27'
title: GitHub two-factor authenication guide
description: Secure your GitHub account with these easy steps.
tags: [Git]
book: archive
---

<Notice archive>

See GitHub's [Two factor authentication articles](https://help.github.com/categories/two-factor-authentication-2fa/) on help.github.com.

</Notice>

Two-factor authentication in GitHub is pretty simple to set up, though the exact steps are layed out in maybe 3 different articles. I've consolidated them all together to this one simple guide.

## Setting up 2FA

### Enable 2FA

Enable [2 factor authentication](https://github.com/settings/security) on the GitHub website (Settings → Security → Two Factor Authentication).

- [2 factor authentication settings](https://github.com/settings/security) _(github.com)_

### Prepare your phone

Install [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator), or an equivalent of such. Works for iOS and Android. In Authenticator, tap _Add_, then _Scan Barcode_. Take a picture of the QR code on your computer. ([More info on apps](https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/))

## For HTTPS

If you're using SSH keys to access your Git repos, you can skip this section. If you're using `https://` URL's in your Git repos, then read on!

### Enable git credential caching

On your computer, [enable caching your GitHub HTTPS credentials](https://help.github.com/articles/caching-your-github-password-in-git/). This allows you to store your 2FA token and not get asked for it everytime.

```bash
# MacOS:
git config --global credential.helper osxkeychain
```

```bash
# Linux:
git config --global credential.helper cache
```

This only applies if you use HTTP authentication for your Git repositories. If you use SSH keys, this shouldn't be necessary.

### Generate an API key

[Generate a GitHub API key](https://github.com/settings/tokens) under "Personal Access Tokens". You'll use this for the Git command line. Leave the scopes unchanged.

### Use HTTPS on your repos

If your git repos still use SSH (`git@github.com:user/repo.git`), change them to use HTTPS (`https://github.com/user/repo.git`). ([More info on remote URLs](https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-https-recommended))

```bash
cd project
vim .git/config
```

## Try it out

### Git push

Push a repo. You'll be asked for a password. Use the token for the password. You won't have to do this again if enabled credential caching.

```bash
$ git push
```

```
Username for 'https://github.com': rstacruz
Password for 'https://rstacruz@github.com':
```

### Save your recovery codes

Get your [recovery codes](https://github.com/settings/auth/recovery-codes) (Settings → Security → Two Factor Authentication → Recovery Codes) and put them somewhere safe. This will allow you to log onto your account when, say, your phone isn't charged. ([More info on recovery codes](https://help.github.com/articles/downloading-your-two-factor-authentication-recovery-codes/))

## That's it!

If everything worked, your `git push` should work just fine.

### References

- [Two factor authentication articles](https://help.github.com/categories/two-factor-authentication-2fa/) (github.com)
- [TOTP mobile apps](https://help.github.com/articles/configuring-two-factor-authentication-via-a-totp-mobile-app/) (github.com)
- [About two factor authentication](https://help.github.com/articles/about-two-factor-authentication/) (github.com)
- [Providing your 2FA Authentication Code](https://help.github.com/articles/providing-your-2fa-authentication-code/) (github.com)
- [Caching your GitHub password](https://help.github.com/articles/caching-your-github-password-in-git/) (github.com)
- [Downloading your two factor recovery codes](https://help.github.com/articles/downloading-your-two-factor-authentication-recovery-codes/) (github.com)
- [HTTPS remote URLs](https://help.github.com/articles/which-remote-url-should-i-use/) (github.com)
