import React from 'react'
import Refractor from 'react-refractor'
import './CodeHighlight/registerRefractorLanguages'

interface Props {
  children: React.ReactNode
  className?: string
}

const ALIASES: { [key: string]: string } = {
  sh: 'bash',
}

const CodeHighlight = ({ children, className }: Props) => {
  const node = children as { props: { children: string; className?: string } }
  const code = node.props.children
  const lang = (node.props.className || '').replace(/^language-/, '')
  const language = ALIASES[lang] || lang

  if (!lang) {
    return (
      <pre className={className}>
        <code>{code}</code>
      </pre>
    )
  }

  return <Refractor language={language} value={code} className={className} />
}

/*
 * Export
 */

export default CodeHighlight
