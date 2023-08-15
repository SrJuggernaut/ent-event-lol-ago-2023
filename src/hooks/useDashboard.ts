import { type TeamList, type User } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAppSelector from './useAppSelector'

export interface useDashboardReturn {
  isReady: boolean
  user?: User
  teams?: TeamList
}

const useDashboard = (staffOnly?: boolean): useDashboardReturn => {
  const { sessionStatus, user, teams } = useAppSelector((state) => state.session)
  const router = useRouter()

  useEffect(() => {
    if ((sessionStatus === 'succeeded' && user === undefined) || (staffOnly === true && teams?.total === 0)) {
      router.push('/login')
    }
  }, [sessionStatus, user, teams])

  if (sessionStatus === 'failed') {
    router.push('/login')
  }

  return {
    isReady: sessionStatus === 'succeeded' && user !== undefined,
    user,
    teams
  }
}

export default useDashboard
