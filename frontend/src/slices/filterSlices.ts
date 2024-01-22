import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FilterSlices from '../interfaces/FilterSlices';

const initialState:FilterSlices={
    open:false
}

export const showButtonCloseFilter= createAsyncThunk('filter/showButtonCloseFilter',()=>{
    return
})

export const showButtonOpenFilter= createAsyncThunk('filter/showButtonOpenFilter',()=>{
    return
})

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{},
    extraReducers:function(build){
        build
        .addCase(showButtonCloseFilter.fulfilled,(state)=>{
            state.open=true
        })
        .addCase(showButtonOpenFilter.fulfilled,(state)=>{
            state.open=false
        })
    }
})

export default filterSlice.reducer