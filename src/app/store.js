import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'
import goodReducer from '../features/good/goodSlice'
import userReducer from '../features/user/userSlice'
import chatReducer from '../features/chat/chatSlice'
import groupReducer from '../features/groups/groupSlice'
import skillReducer from '../features/skill/skillSlice'
import adminReducer from '../features/admin/adminSlice'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        good: goodReducer,
        user: userReducer,
        chat: chatReducer,
        group: groupReducer,
        skill: skillReducer,
        admin: adminReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)