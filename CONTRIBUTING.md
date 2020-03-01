# Developer notes

## Dev setup with Docker

You can set up a development environment with [Docker]. First install _docker_ and _docker-compose_, then:

```sh
docker-compose up
```

## Dev setup without docker

With Yarn:

```sh
yarn
yarn develop
```

or with npm:

```
npm install
npm run develop
```

[docker]: https://www.docker.com/

## Yarn resolutions

- `resolutions['@types/react']` - _@types/react_ is required by gatsby, gatsby-link, reach/router and more. If they all use different versions of _@types/react_, TypeScript errors happen.
