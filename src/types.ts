export interface PageNode {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    layout: string
    date: string | void
    tags: string[] | void
    description: string | void
  }
}
