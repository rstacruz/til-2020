import React from 'react'
import { Waypoint } from 'react-waypoint'

export interface State {
  entered: boolean
  dirty: boolean
}

export interface Props {
  children: (state: State) => React.ReactNode
  topOffset?: string
  bottomOffset?: string
}

// Where it transitions
const TRIPWIRE = 0.65

// Larger overlap = more chances of having 2 active at a time
const OVERLAP = 0.02

class CardWaypoint extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { entered: true, dirty: false }
  }

  componentDidMount() {
    this.setState(
      (state: State): State => {
        if (state.dirty) {
          return state
        }
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
    const { children, topOffset, bottomOffset } = this.props

    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        topOffset={topOffset || `${(TRIPWIRE - OVERLAP) * 100}%`}
        bottomOffset={bottomOffset || `${(1 - TRIPWIRE) * 100}%`}
      >
        <span>{children(this.state || { entered: false, dirty: false })}</span>
      </Waypoint>
    )
  }
}

export default CardWaypoint
