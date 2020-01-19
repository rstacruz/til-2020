import React from 'react'
import { HastNode } from '../types'
import makeToReact from '../helpers/to_react'
import 'typeface-public-sans'

const Div = ({ children, ...props }) => <div {...props}>{children}</div>

const toReact = makeToReact({
  components: {
    'h2-body': Div,
    'h2-section': Div,
    'h3-body': Div,
    'h3-section': Div,
    'multi-comparison': Div,
    'next-block': Div
  }
})

interface Props {
  title: string
  date: string | void
  body: HastNode[]
}

const SimplePostContent = (props: Props) => {
  const { title, date, body: sections } = props
  return (
    <div className='SimplePostContent'>
      <h1 className='title'>{title}</h1>
      {date ? <h5>{date}</h5> : null}
      <MarkdownStyles>{sections.map(body => toReact(body))}</MarkdownStyles>

      <style jsx>{`
        @import 'src/css-utils/ms.css';
        @import 'src/css-utils/container.css';
        @import 'src/css-utils/thin-scrollbar.css';
        @import 'src/css-utils/type.css';

        .SimplePostContent {
          @apply container leading-relaxed antialiased;
          @apply type-body-sans;
          color: #181818;
        }

        .title {
          @apply ms-6 mt-32 mb-4 type-thin-heading text-gray-700;
          color: #705075;
        }
      `}</style>
    </div>
  )
}

const MarkdownStyles = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='root'>
      {children}

      <style jsx>{`
        @import 'src/css-utils/ms.css';
        @import 'src/css-utils/container.css';
        @import 'src/css-utils/thin-scrollbar.css';
        @import 'src/css-utils/type.css';

        .shadow-32 {
          box-shadow: 0.07px 1px rgba(0, 0, 80, 0.07),
            0 2px 2px rgba(0, 0, 80, 0.07), 4px 4px 4px rgba(0, 0, 80, 0.07),
            0 8px 8px rgba(0, 0, 80, 0.07), 0 16px 16px rgba(0, 0, 80, 0.07),
            0 32px 32px rgba(0, 0, 80, 0.07);
        }

        .pre-background {
          background: linear-gradient(
            175deg,
            #755d88,
            #303048 60%,
            #303080 400%
          );
          background-attachment: fixed;
        }

        .root :global(pre, ol, ul, h1, h2, h3, h4, h5, h6, figure) {
          @apply my-6;
        }

        .root :global(pre) {
          @apply p-4 px-8 my-8 -mx-8 type-monospace;
          @apply overflow-x-auto thin-scrollbar;
          @apply shadow-32 pre-background;
          border-radius: 2px;
          position: relative;
        }

        .root :global(pre + pre) {
          @apply -mt-4;
        }

        .root :global(pre code) {
          color: #e3e3f5;
        }

        .root :global(hr) {
          @apply w-64 block my-4 my-8 bg-gray-300 h-px border-0;
          @screen md {
            @apply my-10;
          }
        }

        .root :global(h2) {
          @apply ms-4 mt-32 mb-4 type-thin-heading text-gray-700;
        }

        .root :global(h3) {
          @apply ms-1 mt-8 mb-0 type-bold-heading text-gray-900;
        }

        .root :global(a) {
          @apply text-gray-500 no-underline;
        }

        .root :global(code) {
          @apply type-monospace text-gray-700;
        }

        .root :global(figure) {
          @apply mx-0;
        }

        .root :global(figure > figcaption:first-child) {
          @apply m-0 -mb-8 py-2 px-4 text-sm bg-gray-100 text-gray-700;
        }

        .root :global(h3 + div > p) {
          @apply mt-1;
        }
      `}</style>
    </div>
  )
}

export default SimplePostContent
