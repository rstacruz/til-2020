import React from 'react'
import Waypoint from 'react-waypoint'
import './H2Section.css'

class H2Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entered: false
    }
    console.log('ctor')
  }

  onEnter = () => {
    this.setState({ entered: true })
    console.log('onEnter')
  }

  onLeave = () => {
    this.setState({ entered: false })
    console.log('onLeave')
  }

  render() {
    const className = [
      this.props.className,
      this.state.entered ? '-active' : '-inactive'
    ].join(' ')

    const { children } = this.props

    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        onPositionChange={args => {
          console.log('onPositionChange', args)
        }}
        topOffset="60%"
        bottomOffset="30%"
      >
        <section className={className}>{children}</section>
      </Waypoint>
    )
  }
}

export default H2Section
