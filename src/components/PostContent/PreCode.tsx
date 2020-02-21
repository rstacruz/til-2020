import cn from 'classnames'
import React from 'react'
import refractor from 'refractor'
import makeToReact from '../../helpers/to_react'
import CSS from './PreCode.module.css'

const LANGUAGES: { [key: string]: string } = {
  sh: 'bash'
}

interface Props {
  children: React.ReactNode
  className?: string
}

const PreCode = ({ children, className, ...props }: Props) => {
  let ast
  let highlighted

  // Try to extract { language, content }, but if that fails,
  // just pass thru to a regular `<pre>`.
  const code = getCode(children)
  if (!code) {
    return <pre {...props}>{children}</pre>
  }

  // Highlight using prism (via refractor)
  try {
    ast = refractor.highlight(code.content, code.language)
    highlighted = toReact(ast)
  } catch (error) {
    return <pre {...props}>{children}</pre>
  }

  return (
    <pre {...props} className={cn(CSS.root, className)}>
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

  const language = m[1]
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

function toReact(nodes: refractor.RefractorNode[]) {
  const root = { type: 'root', children: nodes }
  const element = makeToReact({})(root) as JSX.Element
  return element.props.children
}

/*
 * Export
 */

export default PreCode
