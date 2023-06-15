import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice'
import postReducer from '../redux/postSlice'
import dialogsSlice from './dialogsSlice'
import mapSlice from './mapSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        dialog: dialogsSlice,
        map: mapSlice
    },
  })