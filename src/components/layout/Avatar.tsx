'use client'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { getCurrentUser } from '@/services/frontend/session'
import { setError, setStatus, setUser } from '@/state/sessionSlice'
import { faRightToBracket, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { iconButton } from '@styled/recipes'
import { AppwriteException } from 'appwrite'
import NextLink from 'next/link'
import { useEffect, type FC } from 'react'

const Avatar: FC = () => {
  const dispatch = useAppDispatch()
  const { user, sessionStatus } = useAppSelector(state => state.session)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(setStatus('loading'))
      getCurrentUser()
        .then((user) => {
          dispatch(setUser(user))
          dispatch(setStatus('succeeded'))
        })
        .catch((error) => {
          if (error instanceof AppwriteException) {
            if (error.code !== 401) {
              dispatch(setStatus('failed'))
              dispatch(setError(error.message))
              return
            }
            dispatch(setUser(undefined))
            dispatch(setStatus('succeeded'))
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NextLink
        className={iconButton({
          size: 'medium'
        })}
        href={sessionStatus === 'succeeded' && user !== undefined ? '/profile' : '/login'}
      >
        {sessionStatus === 'idle' || sessionStatus === 'loading'
          ? (<FontAwesomeIcon icon={faSpinner} spin size="xl" fixedWidth />)
          : sessionStatus === 'succeeded' && user !== undefined
            ? (<FontAwesomeIcon icon={faUser} size="xl" fixedWidth />)
            : (<FontAwesomeIcon icon={faRightToBracket} size="xl" fixedWidth />)
        }
      </NextLink>
    </>
  )
}

export default Avatar
