/*
 * Home page
 */

import React from 'react'
import { Penpad, Specimen } from '@rstacruz/penpad'
import BlogPostTitle from '../components/BlogPostTitle'

const StyleguidePage = () => {
  return (
    <Penpad>
      <Specimen
        id='BlogPostTitle'
        width='100%'
        description='The title of a blog post'
      >
        <div>
          <BlogPostTitle
            title='Hello world'
            date='November 11, 2019'
            body={[]}
          />
        </div>
      </Specimen>

      <Specimen id='BlogPostTitle/multiline' width='100%'>
        <div>
          <BlogPostTitle
            title='This is a very long title and it will wrap'
            date='November 11, 2019'
            body={[]}
          />
        </div>
      </Specimen>
    </Penpad>
  )
}

export default StyleguidePage
