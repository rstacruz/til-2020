import React from 'react'
import Waypoint from 'react-waypoint'
import debugjs from 'debug'
import './H2Section.css'

const debug = debugjs('app:H2Section')

class H2Section extends React.Component {
  state = {
    entered: true,
  }

  constructor(props) {
    super(props)
    debug('constructor', this.props.className)
  }

  componentDidMount() {
    debug('componentDidMount', this.props.className)
  }

  onEnter = () => {
    debug('onenter', this.props.className)
    this.setState({ entered: true })
  }

  onLeave = () => {
    debug('onleave', this.props.className)
    this.setState({ entered: false })
  }

  render() {
    const className = [
      this.props.className,
      this.state.entered ? '-active' : '-inactive',
    ].join(' ')

    const { children } = this.props

    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        topOffset="60%"
        bottomOffset="40%"
      >
        <section className={className}>{children}</section>
      </Waypoint>
    )
  }
}

export default H2Section
