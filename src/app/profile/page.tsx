'use client'
import Typography from '@/components/ui/Typography'
import useDashboard from '@/hooks/useDashboard'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@styled/css'
import { Divider } from '@styled/jsx'
import { type FC } from 'react'
import SummonerNameForm from './SummonerNameForm'
import UpdatePasswordForm from './UpdatePasswordForm'

const Page: FC = () => {
  const { isReady } = useDashboard()
  if (!isReady) {
    return (
      <>
        <Typography variant="h1" align="center">Perfil</Typography>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </>
    )
  }
  return (
    <>
      <Typography variant="h1" align="center">Perfil</Typography>
      <SummonerNameForm />
      <Divider color="border" marginBlock="medium"/>
      <UpdatePasswordForm />
    </>
  )
}

export default Page
