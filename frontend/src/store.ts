import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import petReducer from './slices/petsSlices'
import filterReducer from './slices/filterSlices'
import userReducer from './slices/userSlices'
import authReducer from './slices/authSlices'

export const store=configureStore({
    reducer:{
        pet:petReducer,
        filter:filterReducer,
        user:userReducer,
        auth:authReducer
    }
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector
