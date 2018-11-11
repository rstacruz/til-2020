import React from 'react'
import Waypoint from 'react-waypoint'
import style from './H2Section.scoped.css'

class H2Section extends React.Component {
  state = {
    entered: false
  }

  onEnter = () => {
    this.setState({ entered: true })
  }

  onLeave = () => {
    this.setState({ entered: false })
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
        topOffset="60%"
        bottomOffset="40%"
      >
        <section className={className}>
          {children}
          <style jsx>{style}</style>
        </section>
      </Waypoint>
    )
  }
}

export default H2Section
