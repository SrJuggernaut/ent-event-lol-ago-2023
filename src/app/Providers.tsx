'use client'
import store from '@/state/store'
import { type FC, type ReactNode } from 'react'
import { Provider } from 'react-redux'

export interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Providers
