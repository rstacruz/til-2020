import React from 'react'

const PreCode = ({ children, ...props }) => {
  return (
    <pre className='PreCode' {...props}>
      {children}
      <style jsx>{`
        @import 'src/css-utils/ms.css';
        @import 'src/css-utils/container.css';
        @import 'src/css-utils/thin-scrollbar.css';
        @import 'src/css-utils/type.css';

        .shadow-32 {
          box-shadow: 0.05px 1px rgba(0, 0, 80, 0.05),
            0 2px 2px rgba(0, 0, 80, 0.05), 4px 4px 4px rgba(0, 0, 80, 0.05),
            0 8px 8px rgba(0, 0, 80, 0.05), 0 16px 16px rgba(0, 0, 80, 0.05);
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

        .PreCode {
          @apply p-6 px-8 my-8 -mx-8 type-monospace;
          @apply type-monospace;
          @apply overflow-x-auto thin-scrollbar;
          @apply shadow-32 pre-background;
          border-radius: 2px;
          position: relative;
        }

        .PreCode + .PreCode {
          @apply -mt-4;
        }

        .PreCode :global(code) {
          color: #e3e3f5;
        }
      `}</style>
    </pre>
  )
}

export default PreCode
