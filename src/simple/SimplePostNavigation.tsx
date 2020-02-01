import React from 'react'
import CSS from './SimplePostNavigation.module.css'

interface Props {
  title: string
}

const SimplePostNavigation = (props: Props) => {
  return (
    <div className={CSS.root}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default SimplePostNavigation
