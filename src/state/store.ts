import sessionSlice from '@/state/sessionSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
