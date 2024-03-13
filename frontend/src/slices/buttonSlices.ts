import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ButtonSlices from '../interfaces/ButtonSlices';


const initialState:ButtonSlices={
    showButtonFilter:false,
    showButtonMessage:true,
    showNavBar:false
}

export const showButtonCloseFilter= createAsyncThunk('buttons/showButtonCloseFilter',()=>{
    return
})

export const showButtonOpenFilter= createAsyncThunk('buttons/showButtonOpenFilter',()=>{
    return
})

export const showButtonMessageThunk= createAsyncThunk('buttons/showButtonMessage',()=>{
    return
})

export const hideMessageButtonThunk = createAsyncThunk('buttons/hideMessageButton',()=>{
    return
})


export const showNavBarThunk= createAsyncThunk('buttons/showNavBar',()=>{
    return
})

export const hideNavBarThunk = createAsyncThunk('buttons/ hideNavBar',()=>{
    return
})



const buttonSlices=createSlice({
    name:'buttons',
    initialState,
    reducers:{},
    extraReducers:function(build){
        build
        .addCase(showButtonCloseFilter.fulfilled,(state)=>{
            state.showButtonFilter=true
        })
        .addCase(showButtonOpenFilter.fulfilled,(state)=>{
            state.showButtonFilter=false
        })
        .addCase(showButtonMessageThunk.fulfilled,(state)=>{
            state.showButtonMessage=true
        })
        .addCase(hideMessageButtonThunk.fulfilled,(state)=>{
            state.showButtonMessage=false
        })
        .addCase(showNavBarThunk.fulfilled,(state)=>{
            state.showNavBar=true
        })
        .addCase(hideNavBarThunk.fulfilled,(state)=>{
            state.showNavBar=false
        })
    }
})

export default buttonSlices.reducer