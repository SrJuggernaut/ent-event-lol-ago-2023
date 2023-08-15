import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const NotFound: FC = () => {
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
      <Typography variant="h1" align="center" className={css({ fontSize: '110px' })}>404</Typography>
      <Typography variant="h2" align="center" color="text">El árbol que buscas no está aquí</Typography>
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
      </div>
    </div>
  )
}

export default NotFound
