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

export type PageLink = {
  slug: string
  date: string
  title: string
  book?: string | null | void
  tags: string
}

