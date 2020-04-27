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

const CodeHighlight = ({ children, className, ...props }: Props) => {
  const node = children as { props: { children: string; className: string } }
  const code = node.props.children
  const lang = node.props.className.replace(/^language-/, '')
  const language = ALIASES[lang] || lang

  return <Refractor language={lang} value={code} />
}

/*
 * Export
 */

export default CodeHighlight
