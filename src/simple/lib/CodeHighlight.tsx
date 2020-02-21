import React from 'react'
import refractor from 'refractor'
import makeToReact from '../../helpers/to_react'

const LANGUAGES: { [key: string]: string } = {
  sh: 'bash'
}

interface Props {
  children: React.ReactNode
  className?: string
}

const CodeHighlight = ({ children, className, ...props }: Props) => {
  let ast
  let highlighted

  // Try to extract { language, content }, but if that fails,
  // just pass thru to a regular `<pre>`.
  const code = getCode(children)
  if (!code) {
    return (
      <pre {...props} className={className}>
        {children}
      </pre>
    )
  }

  // Highlight using prism (via refractor)
  try {
    ast = refractor.highlight(code.content, code.language)
    highlighted = toReact(ast)
  } catch (error) {
    return (
      <pre {...props} className={className}>
        {children}
      </pre>
    )
  }

  return (
    <pre {...props} className={className}>
      <code data-language={code.language}>{highlighted}</code>
    </pre>
  )
}

/**
 * Attempt to extract { language, content } from a <pre> element
 */

interface GetCodeResult {
  language: string
  content: string
}

function getCode(children: any): GetCodeResult | void {
  if (!children) {
    return
  }

  const code = children[0]
  if (!code) {
    return
  }
  if (code.type !== 'code') {
    return
  }
  if (!code.props) {
    return
  }

  const { className } = code.props
  if (!className) {
    return
  }

  const m = className.match(/^language-(.*)$/)
  if (!m) {
    return
  }

  const language: string = m[1]
  const textNodes = code.props.children

  return {
    content: textNodes.join(''),
    language: LANGUAGES[language] || language
  }
}

/**
 * Convert a rehype ast to React. But there's no root node, lol, so let's make
 * one.
 */

function toReact(nodes: any[]) {
  const root = { type: 'root', children: nodes }
  const element = makeToReact({})(root) as JSX.Element
  return element.props.children
}

/*
 * Export
 */

export default CodeHighlight
