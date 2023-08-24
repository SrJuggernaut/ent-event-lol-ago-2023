'use client'
import CountDown from '@/components/CountDown'
import Typography from '@/components/ui/Typography'
import { endDate } from '@/helpers/date'
import useAppSelector from '@/hooks/useAppSelector'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID } from '@/services/frontend/userTeams'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const CallToAction: FC = () => {
  const { user, teams } = useAppSelector(state => state.session)

  if (user !== undefined && teams !== undefined && teams.teams.some((team) => team.$id === REVIEWER_TEAM_ID || team.$id === ADMIN_TEAM_ID)) {
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
          Bienvenido Revisor
        </Typography>
        <Typography variant="body1" align="center">
          Revisa las evidencias de los participantes, quedan:
        </Typography>
        <CountDown endDate={endDate} />
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/evidence-review"
        >
          Revisar evidencias
        </NextLink>

      </div>
    )
  } else {
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
          Revisa los resultados en el siguiente enlace, Únete a nuestro Discord par más eventos.
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
}

export default CallToAction
