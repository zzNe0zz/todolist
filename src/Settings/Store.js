import { configureStore } from '@reduxjs/toolkit'
import DataReducer from './SliceRedux'

export const store = configureStore({
  reducer: {
    setData: DataReducer,
  },
})