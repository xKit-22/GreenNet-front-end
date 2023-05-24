import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice'
import postReducer from '../redux/postSlice'
import dialogsSlice from './dialogsSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        dialog: dialogsSlice
    },
  })