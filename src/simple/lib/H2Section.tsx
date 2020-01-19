import React from 'react'

const H2Section = ({ children, ...props }) => {
  return (
    <section className='H2Section' {...props}>
      <div className='inner'>{children}</div>
      <span className='separator'></span>

      <style jsx>{`
        .separator {
          @apply block mt-12 mb-12;
        }

        .separator::after {
          content: '';
          @apply block mx-auto h-32 bg-gray-400 w-px;
        }

        .separator::before {
          content: '';
          @apply block w-48 h-px mx-auto bg-gray-400;
        }

        .inner {
          /* hmm */
        }
      `}</style>
    </section>
  )
}

export default H2Section
