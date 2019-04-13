/*
 * Home page
 */

import React from 'react'
import { Penpad } from '@rstacruz/penpad'
import BlogPostTitle from '../components/BlogPostTitle'

const StyleguidePage = () => {
  return (
    <Penpad
      title='TIL styleguides'
      specimens={{
        BlogPostTitle: {
          view: () => (
            <div>
              <BlogPostTitle
                title={'Hello world'}
                date={'November 11, 2019'}
                body={[]}
              />
            </div>
          ),
          description: `
            The title of a blog post
          `,
          width: '100%'
        },
        'BlogPostTitle/multiline': {
          view: () => (
            <div>
              <BlogPostTitle
                title={'This is a very long title and it will wrap'}
                date={'November 11, 2019'}
                body={[]}
              />
            </div>
          ),
          width: '100%'
        }
      }}
    />
  )
}

export default StyleguidePage
