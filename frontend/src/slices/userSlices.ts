import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DataCreateUser from '../interfaces/DataCreateUser'
import {createUser} from '../services/userServices'

const initialState={
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


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:function(build){
        build
        .addCase(createUserThunk.fulfilled,(state,action)=>{
            state.user=action.payload
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
    }
})

export const {} = userSlice.actions
export default userSlice.reducer

