// @flow

import * as React from 'react'
import Waypoint from 'react-waypoint'

export type State = {
  entered: boolean,
  dirty: boolean
}

export type Props = {
  children: State => React.Node
}

// Where it transitions
const TRIPWIRE = 0.65

// Larger overlap = more chances of having 2 active at a time
const OVERLAP = 0.04

class CardWaypoint extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { entered: true, dirty: false }
  }

  componentDidMount() {
    this.setState(
      (state: State): State => {
        if (state.dirty) return state
        return { entered: false, dirty: true }
      }
    )
  }

  onEnter = () => {
    this.setState({ entered: true, dirty: true })
  }

  onLeave = () => {
    this.setState({ entered: false, dirty: true })
  }

  render() {
    const { children } = this.props

    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        topOffset={`${(TRIPWIRE - OVERLAP) * 100}%`}
        bottomOffset={`${(1 - TRIPWIRE) * 100}%`}
      >
        <span>{children(this.state || {})}</span>
      </Waypoint>
    )
  }
}

export default CardWaypoint
