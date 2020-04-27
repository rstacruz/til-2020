import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const query = graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  return useStaticQuery(query).site.siteMetadata
}

export default useSiteMetadata
