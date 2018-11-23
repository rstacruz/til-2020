// @flow

export type PageNode = {
  excerpt: string,
  fields: {
    slug: string
  },
  frontmatter: {
    title: string,
    date: ?string,
    tags: ?(string[]),
    description: ?string,
    attachments: ?Array<{ publicURL: ?string }>
  }
}

export type HastNode = {
  type: 'element' | 'comment' | 'text',
  tagName: string,
  children?: HastNode[]
}
