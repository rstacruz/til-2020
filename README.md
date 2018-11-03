<br>

<p align='center'>
  <a href='https://www.gatsbyjs.org'>
    <img alt='Gatsby' src='https://www.gatsbyjs.org/monogram.svg' width='60' />
  </a>
</p>

<br>

<h1 align="center">
  Gatsby simplified starter
</h1>

<p align='center'>
This is a simplified version of the default Gatsby boilerplate.<br>
See <a href='https://github.com/gatsbyjs/gatsby-starter-default'>gatsbyjs/gatsby-starter-default</a>.
</p>

## Quick start

1. **Create a Gatsby site.** <br> Use the Gatsby CLI to create a new site, specifying this starter.

```sh
npx gatsby new my-project-name https://github.com/rstacruz/gatsby-starter-simplified
```

2. **Read developer notes** <br> See [CONTRIBUTING.md](CONTRIBUTING.md) on info on how to start a server.

```sh
cd my-project-name
less CONTRIBUTING.md
```

## About this boilerplate

This is the same as the default starter pack, except with these omissions:

- All default CSS has been removed.
- Extraneous config files have been removed.
- Service workers support (`gatsby-plugin-offline`) has been removed.
- Responsive image support (`gatsby-image`) has been removed.
- Image optimization (`gatsby-plugin-sharp`) has been removed.

These things have been added:

- Normalize/reset CSS ([sanitize.css](https://yarn.pm/sanitize.css)) has been added.
- Docker support for development (see [developer notes](CONTRIBUTING.md)) has been added.

These omissions can be added back as you need them; see [extras](EXTRAS.md) for notes on how to do that.
See [CONTRIBUTING.md](CONTRIBUTING.md) for developer notes.
