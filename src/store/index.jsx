import { configureStore } from '@reduxjs/toolkit'
import tweetReducer from '../slices/tweet'
import userReducer from '../slices/user'

export default configureStore({
    reducer: {
        tweets: tweetReducer,
        users: userReducer,
    },
})