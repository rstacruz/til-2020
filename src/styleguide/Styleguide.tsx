import React from 'react'
import CSS from './Styleguide.module.css'
import Navigation from './Navigation'
import { Pages } from './types'
import useAppState, { Actions } from './useAppState'

interface Props {
  title?: string
  pages: Pages
}

const Styleguide = (props: Props) => {
  const { state, actions } = useAppState()
  const { title, pages } = props

  return (
    <div className={CSS.root}>
      <div className={CSS.body}>
        <main className={CSS.main}>
          {state.activePage ? <Page page={pages[state.activePage]} /> : null}
        </main>
        <aside className={CSS.sidebar}>
          <h1 className={CSS.title}>{title}</h1>
          <Navigation {...{ pages, state, actions }} />
        </aside>
      </div>
    </div>
  )
}

const Page = ({ page }) => {
  return <>{page()}</>
}

Styleguide.defaultProps = {
  title: 'Styleguide',
  pages: {}
}

export default Styleguide
