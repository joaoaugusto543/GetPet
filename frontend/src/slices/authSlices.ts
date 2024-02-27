import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {createSession} from '../services/sessionServices'
import DataCreateSession from '../interfaces/DataCreateSession'
import InitialStateAuth from '../interfaces/InitialStateAuth'
import {updateCode} from '../services/userServices'


const user: string | null = localStorage.getItem('user')
const token: string | null = localStorage.getItem('token')

const initialState:InitialStateAuth={
    user:user ? JSON.parse(user) : null,
    token:token ? token : null,
    loading:false,
    error:null,
    success:false,
    code:null
}

export const login=createAsyncThunk('auth/login',async (data:DataCreateSession,thunkApi)=>{
    
    const res=await createSession(data)

    if(res.error === 'Invalid code'){
        await updateCode(data.email)
        return thunkApi.rejectWithValue(res.error)
    }

    if(res.error){
        return thunkApi.rejectWithValue(res.error)
    }

    localStorage.setItem('user',JSON.stringify(res.user))
    localStorage.setItem('token',res.token)

    return res
})

export const logout=createAsyncThunk('auth/logout',async (_data)=>{
    

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    return
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:function(build){
        build
        .addCase(login.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
            state.loading=false
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.rejected,(state,action)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
            state.token=null
        })
    }
})

export const {}=authSlice.actions
export default authSlice.reducer