import React from 'react'
import CSS from './SectionNavLink.module.css'
import cn from 'classnames'

function SectionNavLink(props: {
  id: string
  isActive?: boolean
  label: string
}) {
  const { id, isActive, label } = props

  return (
    <a
      href={`#${id}`}
      className={cn(CSS.item, { [CSS.isActive]: isActive })}
      key={id}
    >
      <span className={CSS.rule} />
      <span className={CSS.label}>{label}</span>
      <span className={CSS.spacer} />
    </a>
  )
}

export default SectionNavLink
