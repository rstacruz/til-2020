import React, { useContext } from 'react'
import CSS from './Figure.module.css'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  title?: string
  wide?: boolean
  cover?: boolean
  bordered?: boolean
  code?: boolean
}

/**
 * Context for a figure
 */

const FigureContext = React.createContext<boolean | null>(null)

/**
 * @example
 *     <Figure>...</Figure>
 *     <Figure cover>...</Figure>
 *     <Figure table>...</Figure>
 *     <Figure code title='hello'>...</Figure>
 */
const Figure = (props: Props) => {
  const { title } = props

  const cssClasses = (props.className || '').split(' ')
  const classes = [...cssClasses, ...Object.keys(props)]
  const isCode = classes.includes('code')

  const figureClass = cn(CSS.root, {
    [CSS.isWide]: classes.includes('-wide'),
    [CSS.cover]: classes.includes('cover'),
    [CSS.table]: classes.includes('table'),
    [CSS.bordered]: classes.includes('bordered'),
    [CSS.code]: classes.includes('code'),
  })

  return (
    <FigureContext.Provider value={true}>
      <figure className={figureClass}>
        {isCode ? (
          <figcaption className={CSS.titlebar}>{title || ''}</figcaption>
        ) : null}
        <div className={CSS.body}>{props.children}</div>
      </figure>
    </FigureContext.Provider>
  )
}

/**
 * Wrap something in a figure, but only if it isn't already.
 *
 * @example
 *     <Figurify>
 *       <PreCode>...</PreCode>
 *     </Figurify>
 */

export function Figurify({ children, ...props }: Props) {
  const isInFigure = useContext(FigureContext)

  if (isInFigure) {
    return <>{children}</>
  } else {
    return <Figure {...props}>{children}</Figure>
  }
}

export default Figure
