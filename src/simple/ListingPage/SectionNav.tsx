import React from 'react'
import CSS from './SectionNav.module.css'
import { useSection } from '../../templates/shared/SectionNavigation'
import SectionNavLink from './SectionNav/SectionNavLink'

function SectionNav(props: { sections: { [key: string]: { label: string } } }) {
  const sections = useSection()
  const activeSection = sections ? sections.active : null

  return (
    <div className={CSS.root}>
      {Object.entries(props.sections).map(([id, { label: label }]) => {
        const isActive = activeSection === id
        return <SectionNavLink {...{ id, isActive, label }} />
      })}
    </div>
  )
}

export default SectionNav
