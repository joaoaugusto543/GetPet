import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import filter from '../scripts/filter'
import InitialStatePet from '../interfaces/InitialStatePet'
import DataFilterPets from '../interfaces/DataFilterPets';
import { showPet, showPets } from '../services/petServices';

const initialState:InitialStatePet={
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

export const getPet=createAsyncThunk('pets/getPet',async (data:{id:string},thunkAPI) =>{

    const {id}=data

    const pets= await showPet(id)

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
        .addCase(getPet.fulfilled,(state,action)=>{
            state.pet=action.payload
        })
        .addCase(getPet.pending,(state)=>{
            state.loading=true
        })
        .addCase(getPet.rejected,(state,action)=>{
            state.error=action.payload
        })
    }
})

export const {}=petsSlice.actions
export default petsSlice.reducer

