import React from 'react'

const Unorphan = (props: { children: string }) => {
  if (typeof props.children !== 'string') {
    throw new Error("Unorphan: 'children' must be a solitary string")
  }

  const string = props.children
  const words = string.trim().split(' ')
  const left = words.slice(0, words.length - 2)
  const right = words.slice(words.length - 2)

  return (
    <>
      {left.join(' ')}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>{right.join(' ')}</span>
    </>
  )
}

export default Unorphan
