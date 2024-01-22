import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import filter from '../scripts/filter'
import initialStatePet from '../interfaces/initialStatePet'
import DataFilterPets from '../interfaces/DataFilterPets';
import { showPets } from '../services/PetServices';

const initialState:initialStatePet={
    pets:[],
    pet:null,
    loading:false,
    error:null
}

export const filterPets=createAsyncThunk('pets/filter',async (data:DataFilterPets)=>{

    const {pets,filterData}=data

    const petsFiltered=filter(pets,filterData)

    return petsFiltered
})

export const getPets=createAsyncThunk('pets/getPets',async (_data,thunkAPI) =>{

    const pets= await showPets()

    if(pets.error){
        return thunkAPI.rejectWithValue(pets.error)
    }

    return pets
})

const petsSlice=createSlice({
    name:'pets',
    initialState,
    reducers:{},
    extraReducers:function(build){
        build
        .addCase(filterPets.fulfilled,(state,action)=>{
            state.pets=action.payload
        })
        .addCase(getPets.fulfilled,(state,action)=>{
            state.pets=action.payload
        })
        .addCase(getPets.pending,(state)=>{
            state.loading=true
        })
        .addCase(getPets.rejected,(state,action)=>{
            state.error=action.payload
        })
    }
})

export const {}=petsSlice.actions
export default petsSlice.reducer

