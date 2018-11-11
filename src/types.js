// @flow

export type PageNode = {
  excerpt: string,
  fields: {
    slug: string,
  },
  frontmatter: {
    title: string,
    date: string,
  },
}
