'use client'
import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const Page: FC = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'medium',
        marginBottom: 'medium',
        minHeight: '30vh'
      })}
    >
      <Typography variant="h2" align="center" component="div">
        Gracias por participar
      </Typography>
      <Typography variant="body1" align="center">
        El evento ha terminado. La entrega de premios se realizará durante las próximas semanas.
      </Typography>
      <Typography variant="body1" align="center">
        Revisa los resultados en el siguiente enlace, Únete a nuestro Discord para más eventos.
      </Typography>
      <div
        className={css({
          display: 'flex',
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
  )
}

export default Page
