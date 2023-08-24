import Typography from '@/components/ui/Typography'
import { css, cx } from '@styled/css'
import { center } from '@styled/patterns'
import { button } from '@styled/recipes'
import { type Metadata } from 'next'
import NextLink from 'next/link'
import { type FC } from 'react'

export const metadata: Metadata = {
  title: 'Registro - League Of Rancios - EntGamers',
  description: 'Registro para el evento League Of Rancios de League Of Legends traído a ti por EntGamers & Jim RSNG'
}

const page: FC = () => {
  return (
    <div
      className={cx(center(), css({ minHeight: 'calc(100vh - (72px * 2))' }))}
    >
      <div
        className={css({
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'border',
          borderRadius: 'medium',
          width: '100%',
          maxWidth: { smToXxl: 'breakpoint-sm' },
          padding: 'medium'
        })}
      >
        <Typography variant="h1" align="center">Registro</Typography>
        <Typography variant="body1" align="center">
          El evento ha terminado, el registro está cerrado.
        </Typography>
        <Typography variant="body1" align="center">
          Revisa los resultados en el siguiente enlace, Únete a nuestro Discord para más eventos.
        </Typography>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            gap: 'medium',
            marginTop: 'medium'
          })}
        >
          <NextLink
            className={
              button({
                variant: 'solid',
                color: 'info',
                size: 'medium'
              })
            }
            href="/puntuacion"
          >
            Revisar resultados
          </NextLink>
          <a
            className={
              button({
                variant: 'solid',
                color: 'primary',
                size: 'medium'
              })
            }
            href="http://discord.gg/SYnKcU5"
          >
            Únete a nuestro Discord
          </a>
        </div>
      </div>

    </div>
  )
}

export default page
