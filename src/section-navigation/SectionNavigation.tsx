import React from 'react'

const SectionContext = React.createContext<any>(null)

type Section = {
  id: any
}

/**
 * @example
 *     const ctx = useSections()
 *
 *     <SectionRoot context={ctx} sections={['articles', 'notes', 'archive']}>
 *       <Section id='articles'>...</Section>
 *       <Section id='notes'>...</Section>
 *       <Section id='archive'>...</Section>
 *       <SectionNav />
 *     </SectionRoot>
 */
const SectionRoot = (props: { children: React.ReactNode }) => {
  const [sections, setSections] = React.useState<Section[]>([])

  const ctx = {
    addSection: (id: string) => {
      setSections((sections) => [...sections, { id }])
    },
  }

  return (
    <SectionContext.Provider value={ctx}>
      {props.children}
    </SectionContext.Provider>
  )
}

const Section = (props: { id: any; children: React.ReactNode }) => {
  const ctx = React.useContext(SectionContext)

  React.useEffect(() => {
    ctx.addSection({ id: props.id })
  })

  return <div>{props.children}</div>
}

export { SectionRoot, Section }

