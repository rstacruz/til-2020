import React from 'react'
import { Waypoint } from 'react-waypoint'

type Context = {
  sections: string[]
  active: string | null
  setActiveSection: (id: string) => any
}

const SectionContext = React.createContext<Context | null>(null)

/**
 * @example
 *     <SectionRoot sections={['articles', 'notes', 'archive']}>
 *       <Section id='articles'>...</Section>
 *       <Section id='notes'>...</Section>
 *       <Section id='archive'>...</Section>
 *       <SectionNav />
 *     </SectionRoot>
 */
const SectionRoot = (props: {
  sections: string[]
  children: React.ReactNode
}) => {
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const context: Context = {
    sections: props.sections,
    active: activeSection,
    setActiveSection,
  }

  return (
    <SectionContext.Provider value={context}>
      {props.children}
    </SectionContext.Provider>
  )
}

/**
 * A section
 */

const Section = (props: { id: string; children: React.ReactNode }) => {
  const sections = useSection()
  if (!sections) return null

  // TODO pass waypoint options
  return (
    <Waypoint
      onEnter={() => {
        sections.setActiveSection(props.id)
      }}
    >
      <span>{props.children}</span>
    </Waypoint>
  )
}

/**
 * @example
 *     const SectionNav = () => {
 *       const sections = useSection()
 *       sections.sections
 *       sections.active
 *     }
 */
const useSection = () => {
  return React.useContext(SectionContext)
}

export { SectionRoot, Section, useSection }
