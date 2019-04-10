import React from 'react'

export type Component = React.Component | React.FunctionComponent

export interface Pages {
  [page: string]: Component
}
