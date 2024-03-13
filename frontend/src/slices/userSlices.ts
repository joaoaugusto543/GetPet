import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DataCreateUser from '../interfaces/DataCreateUser'
import {profile, createUser, updateUser, sendMessage} from '../services/userServices'
import InitialStateUser from '../interfaces/InitialStateUser'
import DataUpdateUser from '../interfaces/DataUpdateUser'
import { MessageInterface } from '../interfaces/MessageInterface'

const initialState:InitialStateUser={
    user:null,
    error:null,
    success:false,
    loading:false
}

export const createUserThunk=createAsyncThunk('user/createUser',async (data:DataCreateUser,thunkAPI)=>{

    const res=await createUser(data)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

}) 

export const profileThunk=createAsyncThunk('user/profile',async (data:{token:string},thunkAPI)=>{

    const {token} = data

    const res=await profile(token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

})

export const updateUserThunk=createAsyncThunk('user/updateUser',async (data:{userUpdated:DataUpdateUser,token:string},thunkAPI)=>{

    const {userUpdated,token} = data

    const res=await updateUser(token,userUpdated)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

}) 

export const sendMessageThunk=createAsyncThunk('user/sendMessage',async (data:{message:MessageInterface,token:string},thunkAPI)=>{

    const {message,token} = data

    const res=await sendMessage(token,message)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res

}) 


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        resetUser:function(state){
            state.user=null
        },
        resetError:function(state){
            state.error=null
        },
        resetSuccess:function(state){
            state.success=false
        },
        clear:function(state){
            state.user=null,
            state.error=null,
            state.success=false,
            state.loading=false
        }
    },
    extraReducers:function(build){
        build
        .addCase(createUserThunk.fulfilled,(state)=>{
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(createUserThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(createUserThunk.rejected,(state,action:any)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
        .addCase(profileThunk.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(profileThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(profileThunk.rejected,(state,action:any)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
        .addCase(updateUserThunk.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(updateUserThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(updateUserThunk.rejected,(state,action:any)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
        .addCase(sendMessageThunk.fulfilled,(state)=>{
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(sendMessageThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(sendMessageThunk.rejected,(state,action:any)=>{
            state.error=action.payload
            state.success=false
            state.loading=false
        })
    }
})

export const {resetUser,clear,resetSuccess,resetError} = userSlice.actions
export default userSlice.reducer

