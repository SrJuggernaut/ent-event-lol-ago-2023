'use client'
import { type FC } from 'react'

export interface GlobalErrorProps {
  error: Error
  reset: () => void
}

const GlobalError: FC<GlobalErrorProps> = ({ error, reset }) => {
  return (
    <html>
      <body>
        <h1>{error.name}</h1>
        <h2>{error.message}</h2>
        <button onClick={() => { reset() }}>Try again</button>
      </body>
    </html>
  )
}

export default GlobalError
