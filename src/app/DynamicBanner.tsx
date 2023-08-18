'use client'
import Typography from '@/components/ui/Typography'
import useAppSelector from '@/hooks/useAppSelector'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID } from '@/services/frontend/userTeams'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const DynamicBanner: FC = () => {
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
        <Typography variant="h2" align="center" component="div">
          Inscripciones abiertas
        </Typography>
        <Typography variant="body1" align="center">
          El evento se llevará a cabo del <Typography component="strong" color="info" weight="bold">16 de Agosto al 23 de Agosto</Typography>.
        </Typography>
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/register"
        >
          Click para registrarte
        </NextLink>
      </div>
    )
  }
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
          Revisa evidencias
        </Typography>
        <Typography variant="body1" align="center">
          Puedes revisar las evidencias de los participantes en el siguiente enlace.
        </Typography>
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
  }
  if (user !== undefined && user.prefs.summonerName === undefined) {
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
          Registra tu nombre de invocador
        </Typography>
        <Typography variant="body1" align="center">
          Para poder participar en el evento, necesitas registrar tu nombre de invocador, recuerda que después de registrar tu nombre de invocador no podrás cambiarlo.
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
          Registrar nombre de invocador
        </NextLink>
      </div>
    )
  }
  if (user?.prefs.summonerName !== undefined) {
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
          Envía tu evidencia
        </Typography>
        <Typography variant="body1" align="center">
          Envía evidencia de tus partidas para comenzar a acumular puntos.
        </Typography>
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/evidence-upload"
        >
          Enviar evidencia
        </NextLink>
      </div>
    )
  }
}

export default DynamicBanner
