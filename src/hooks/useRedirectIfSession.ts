import useAppSelector from '@/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useRedirectIfSession = (redirectPath: string): void => {
  const { user, sessionStatus } = useAppSelector((state) => state.session)
  const router = useRouter()
  useEffect(() => {
    if (sessionStatus === 'succeeded' && user !== undefined) {
      router.push(redirectPath)
    }
  }, [sessionStatus, user])
}

export default useRedirectIfSession
