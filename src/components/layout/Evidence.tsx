'use client'
import useAppSelector from '@/hooks/useAppSelector'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID } from '@/services/frontend/userTeams'
import { faFileArrowUp, faFileShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { iconButton } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'
import Tooltip from '../ui/Tooltip'

const Evidence: FC = () => {
  const { user, teams } = useAppSelector((state) => state.session)
  if (user === undefined || teams === undefined) return null
  if (teams?.teams.some((team) => team.$id === REVIEWER_TEAM_ID || team.$id === ADMIN_TEAM_ID)) {
    return (
      <Tooltip
        content="Revisa evidencias"
        position="bottom"
      >
        <NextLink
          className={iconButton({ color: 'primary' })}
          href="/evidence-review"
        >
          <FontAwesomeIcon icon={faFileShield} fixedWidth size='lg'/>
        </NextLink>
      </Tooltip>
    )
  }
  if (user.prefs.summonerName === undefined) return null
  return (
    <Tooltip
      content="Sube evidencia de tus tareas realizadas"
      position="bottom"
    >
      <NextLink
        className={iconButton({ color: 'primary' })}
        href="/evidence-upload"
      >
        <FontAwesomeIcon icon={faFileArrowUp} fixedWidth size='lg'/>
      </NextLink>
    </Tooltip>
  )
}

export default Evidence
