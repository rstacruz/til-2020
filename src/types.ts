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
    attachments: Array<{ publicURL: string | void }> | void
  }
}

export interface HastNode {
  type: 'element' | 'comment' | 'text'
  tagName: string
  children?: HastNode[]
  properties: {
    className?: string
    id?: string
  }
}
