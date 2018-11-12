// @flow

import * as React from 'react'
import Waypoint from 'react-waypoint'

export type State = {
  entered: boolean
}

export type Props = {
  children: State => React.Node
}

class CardWaypoint extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      entered: false
    }
  }
  onEnter = () => {
    this.setState({ entered: true })
  }

  onLeave = () => {
    this.setState({ entered: false })
  }

  render() {
    const { children } = this.props
    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        topOffset="60%"
        bottomOffset="30%"
      >
        <span>{children(this.state || {})}</span>
      </Waypoint>
    )
  }
}

export default CardWaypoint
