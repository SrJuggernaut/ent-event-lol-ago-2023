'use client'
import CountDown from '@/components/CountDown'
import Typography from '@/components/ui/Typography'
import { endDate } from '@/helpers/date'
import useAppSelector from '@/hooks/useAppSelector'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID } from '@/services/frontend/userTeams'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import { isAfter } from 'date-fns'
import NextLink from 'next/link'
import { type FC } from 'react'

const CallToAction: FC = () => {
  const { user, teams } = useAppSelector(state => state.session)
  if (user === undefined) {
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
        {isAfter(new Date(), endDate)
          ? (
            <>
              <Typography variant="h2" align="center" component="div">
                Inscripciones cerradas
              </Typography>
              <Typography variant="body1" align="center">
                La entrega de premios se llevará a cabo la semana siguiente a la finalización del evento.
              </Typography>
            </>
          )
          : (
            <>
              <Typography variant="h2" align="center" component="div">
                Inscripciones abiertas, quedan:
              </Typography>
              <CountDown endDate={endDate} /><NextLink
                className={
                  button({
                    variant: 'solid',
                    color: 'info',
                    size: 'medium'
                  })
                }
                href="/register"
              >
                Regístrate ahora
              </NextLink>
            </>
          )
        }
      </div>
    )
  }
  if (user !== undefined && teams !== undefined && teams.teams.some((team) => team.$id === REVIEWER_TEAM_ID || team.$id === ADMIN_TEAM_ID)) {
    return (
      <>
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

      </>
    )
  }
  if (user !== undefined && user.prefs.summonerName === undefined) {
    return (
      <>
        <Typography variant="h2" align="center" component="div">
          Bienvenido
        </Typography>
        <Typography variant="body1" align="center">
          Por favor, ingresa tu nombre de invocador para poder participar.
        </Typography>
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/profile"
        >
          Ingresa tu nombre de invocador
        </NextLink>
      </>
    )
  }
  if (user?.prefs.summonerName !== undefined) {
    return (
      <>
        <Typography variant="h2" align="center" component="div">
          Envía tus evidencias
        </Typography>
        <Typography variant="body1" align="center">
          Envía tus evidencias para participar en el torneo, quedan:
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
          href="/evidence"
        >
          Enviar evidencias
        </NextLink>
      </>
    )
  }
}

export default CallToAction
