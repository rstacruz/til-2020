import cn from 'classnames'
import slugger from 'github-slugger'
import * as React from 'react'
import CSS from './H2Section.module.css'

export interface Props {
  children: React.ReactNode
  active?: boolean
  className?: string | string[]
}

const H2Section = ({ children, className, active }: Props) => {
  const activeClass = active ? '-active' : '-inactive'
  const title = getH2Text(children)
  const id = title ? slugger().slug(title) : null

  return (
    <section className={cn(CSS.root, className, activeClass)} id={id}>
      {children}
    </section>
  )
}

/**
 * Returns the H2 text. Used for headings
 *
 * @example
 *
 *     getH2Text(<><h2>Hello</h2><p>Hey there</p></>)
 *     // => 'Hello'
 */

function getH2Text(children: React.ReactNode): string | void {
  if (!Array.isArray(children)) {
    return
  }

  const childrenList = children as JSX.Element[]
  const h2 = childrenList.find(node => node.type === 'h2')
  if (!h2) {
    return
  }

  return ((h2 && h2.props && h2.props.children) || []).join('')
}

export default H2Section
