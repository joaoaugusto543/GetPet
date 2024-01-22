import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import petReducer from './slices/PetsSlices'
import filterReducer from './slices/filterSlices'

export const store=configureStore({
    reducer:{
        pet:petReducer,
        filter:filterReducer
    }
})

export const useAppDispatch: ()=> typeof store.dispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector
