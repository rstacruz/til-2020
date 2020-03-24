# Developer notes

## Dev setup

With Yarn:

```sh
yarn
yarn develop
```
## Aubot Yarn resolutions

- `resolutions['@types/react']` - _@types/react_ is required by gatsby, gatsby-link, reach/router and more. If they all use different versions of _@types/react_, TypeScript errors happen.
