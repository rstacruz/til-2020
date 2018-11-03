# Extras

Here are some tricks that are not present in the default starter kit.

## Responsive images

Add packages:

```bash
yarn add gatsby-transformer-sharp gatsby-plugin-sharp gatsby-image
```

Update `gatsby-config.js`:

```diff
 module.exports = {
   plugins: [
+    'gatsby-transformer-sharp',
+    'gatsby-plugin-sharp',
```

Create `src/components/Image.js` (see [image.js](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/image.js)):

```js
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const Image = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
)
export default Image
```
