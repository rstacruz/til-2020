/*
 * Home page
 */

import React from 'react'
import Styleguide from '../styleguide/Styleguide'
import BlogPostTitle from '../components/BlogPostTitle'

const StyleguidePage = () => {
  return (
    <Styleguide
      title='TIL styleguides'
      pages={{
        'home/index': () => <div>hey</div>,
        'BlogPostTitle/index': () => (
          <div>
            <BlogPostTitle
              title={'Hello world'}
              date={'November 11, 2019'}
              body={[]}
            />
          </div>
        ),
        'BlogPostTitle/multiline': () => (
          <div>
            <BlogPostTitle
              title={'This is a very long title and it will wrap'}
              date={'November 11, 2019'}
              body={[]}
            />
          </div>
        ),
        'home/tuple': [
          () => <div>This styleguide page was defined as a tuple.</div>,
          { info: true }
        ]
      }}
    />
  )
}

export default StyleguidePage
