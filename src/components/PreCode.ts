import React from 'react'
import refractor from 'refractor'
import makeToReact from '../helpers/to_react'
import CSS from './PreCode.module.css'
import cn from 'classnames'

const LANGUAGES = {
  sh: 'bash'
}

const PreCode = ({ children, className, ...props }) => {
  let ast, highlighted

  // Try to extract { language, content }, but if that fails,
  // just pass thru to a regular `<pre>`.
  const code = getCode(children)
  if (!code) return <pre {...props}>{children}</pre>

  // Highlight using prism (via refractor)
  try {
    ast = refractor.highlight(code.content, code.language)
    highlighted = toReact(ast)
  } catch (_e) {
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
  if (!children) return

  const code = children[0]
  if (!code) return
  if (code.type !== 'code') return
  if (!code.props) return

  const { className } = code.props
  if (!className) return

  const m = className.match(/^language-(.*)$/)
  if (!m) return

  const language = m[1]
  const textNodes = code.props.children

  return {
    language: LANGUAGES[language] || language,
    content: textNodes.join('')
  }
}

/**
 * Convert a rehype ast to React. But there's no root node, lol, so let's make
 * one.
 */

function toReact(nodes) {
  const root = { type: 'root', children: nodes }
  return makeToReact({})(root).props.children
}

/*
 * Export
 */

export default PreCode
