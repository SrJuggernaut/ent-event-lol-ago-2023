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
          El evento ha terminado, gracias por participar. La entrega de premios se realizará durante las próximas semanas. Puedes revisar los resultados en el siguiente enlace.
        </Typography>
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
      </div>
    )
  }
}

export default DynamicBanner
