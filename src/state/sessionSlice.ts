import { type TeamList, type User } from '@/lib/appwrite'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
  sessionStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  user?: User
  teams?: TeamList
  error?: string
}

const initialState: SessionState = {
  sessionStatus: 'idle'
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<SessionState['sessionStatus']>) => {
      return {
        ...state,
        sessionStatus: action.payload
      }
    },
    setUser: (state, action: PayloadAction<SessionState['user']>) => {
      return {
        ...state,
        user: action.payload
      }
    },
    setTeams: (state, action: PayloadAction<SessionState['teams']>) => {
      return {
        ...state,
        teams: action.payload
      }
    },
    setError: (state, action: PayloadAction<SessionState['error']>) => {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export default sessionSlice

export const { setStatus, setUser, setTeams, setError } = sessionSlice.actions
