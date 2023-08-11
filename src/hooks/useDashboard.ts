import { type User } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAppSelector from './useAppSelector'

export interface useDashboardReturn {
  isReady: boolean
  user?: User
}

const useDashboard = (): useDashboardReturn => {
  const { sessionStatus, user } = useAppSelector((state) => state.session)
  const router = useRouter()

  useEffect(() => {
    if (sessionStatus === 'succeeded' && user === undefined) {
      router.push('/login')
    }
  }, [sessionStatus, user])

  if (sessionStatus === 'failed') {
    router.push('/login')
  }

  return {
    isReady: sessionStatus === 'succeeded' && user !== undefined,
    user
  }
}

export default useDashboard
