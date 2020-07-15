import { useStaticQuery, graphql } from 'gatsby'

type Result = {
  site: {
    siteMetadata: {
      description: string
      fullTitle: string
      siteUrl: string
      title: string
    }
  }
}

const useSiteMetadata = () => {
  const query = graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          description
          fullTitle
          siteUrl
          title
        }
      }
    }
  `
  return useStaticQuery<Result>(query).site.siteMetadata
}

export default useSiteMetadata
