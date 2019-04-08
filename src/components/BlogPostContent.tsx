/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 */

import cn from 'classnames'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { HastNode } from '../types'
import CSS from './BlogPostContent.module.css'
import BlogPostTitle from './BlogPostTitle'
import CardWaypoint, { State as WaypointState } from './CardWaypoint'
import H2Section from './H2Section'
import PostContent from './PostContent'
import PostFooter from './PostFooter'

interface Props {
  body: HastNode[]
  title: string
  date: string | void
  titleBody: HastNode[]
}

interface State {
  activeSection?: number
}

/**
 * Blog post content.
 *
 * @example
 *     <BlogPostContent htmlAst={htmlAst} />
 */

const BlogPostContent = (props: Props) => {
  const { body, titleBody, title, date } = props
  const [state, setState] = useState({ activeSection: 0 })
  const sections = body

  return (
    <div className={cn(CSS.root)}>
      <BlogPostTitle {...{ title, date, body: titleBody }} />
      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        {state.activeSection} / {sections.length}
      </div>

      {sections.map((h2section, idx) => (
        <Waypoint
          onEnter={doHandleEnter({ state, setState, idx })}
          topOffset='63%'
          bottomOffset='35%'
        >
          <span>
            <H2Section
              {...h2section.properties}
              active={idx === state.activeSection}
            >
              <PostContent body={h2section.children} />
            </H2Section>
          </span>
        </Waypoint>
      ))}

      <PostFooter {...{ title, date }} />
    </div>
  )
}

const doHandleEnter = ({ state, setState, idx }) => () => {
  setState({ activeSection: idx })
}

export default BlogPostContent
