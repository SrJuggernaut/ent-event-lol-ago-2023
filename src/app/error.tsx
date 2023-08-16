'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

export interface ErrorProps {
  error: Error
  reset: () => void
}

const error: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - (72px *2))'
      })}
    >
      <Typography variant="h1" align="center" className={css({ fontSize: '110px' })}>{error.name}</Typography>
      <Typography variant="h2" align="center" color="text">{error.message}</Typography>
      <div
        className={css({
          marginTop: '24px'
        })}
      >
        <NextLink
          className={button({ variant: 'solid' })}
          href="/"
        >
          Volver al inicio
        </NextLink>
        <Button
          variant='solid'
          onClick={() => { reset() }}
        >
          Intentar de nuevo
        </Button>
      </div>
    </div>
  )
}

export default error
