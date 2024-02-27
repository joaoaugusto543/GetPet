import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import filter from '../scripts/filter'
import InitialStatePet from '../interfaces/InitialStatePet'
import DataFilterPets from '../interfaces/DataFilterPets'
import { addImage, createPet, deletePet, showPet, showPets, showPetsByUser, updatePet } from '../services/petServices'
import { DataPet } from '../interfaces/DataPet'

const initialState:InitialStatePet={
    pets:[],
    petsDashboard:[],
    pet:null,
    loading:false,
    error:null,
    success:false
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

export const getPetsByUser=createAsyncThunk('pets/getPetsByUser',async (data:{token:string},ThunkAPI)=>{
    const {token}=data

    const res= await showPetsByUser(token)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const createPetThunk=createAsyncThunk('pets/createPet',async (data:{token:string,pet:DataPet},ThunkAPI)=>{
    const {pet,token}=data

    const res= await createPet(pet,token)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const addImageThunk=createAsyncThunk('pets/addImage',async (data:{token:string,image:File,id:string},ThunkAPI)=>{
    const {image,id,token}=data

    const res= await addImage(token,id,image)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const updatePetThunk=createAsyncThunk('pets/updatePet',async (data:{token:string,pet:DataPet,id:string},ThunkAPI)=>{

    const {pet,token,id}=data

    const res= await updatePet(pet,token,id)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const deletePetThunk=createAsyncThunk('pets/deletePet',async (data:{token:string,id:string},ThunkAPI)=>{

    const {token,id}=data

    const res= await deletePet(token,id)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

const petsSlice=createSlice({
    name:'pets',
    initialState,
    reducers:{
        resetSuccess:function(state){
            state.success=false
        },
        resetPet:function(state){
            state.pet=null
        },
        resetPetsDashBoard:function(state){
            state.petsDashboard=[]
        }
    },
    extraReducers:function(build){
        build
        .addCase(filterPets.fulfilled,(state,action)=>{
            state.pets=action.payload
        })
        .addCase(getPets.fulfilled,(state,action)=>{
            state.pets=action.payload
            state.loading=false
        })
        .addCase(getPets.pending,(state)=>{
            state.loading=true
        })
        .addCase(getPets.rejected,(state,action)=>{
            state.error=action.payload
        })
        .addCase(getPet.fulfilled,(state,action)=>{
            state.pet=action.payload
            state.loading=false
        })
        .addCase(getPet.pending,(state)=>{
            state.loading=true
        })
        .addCase(getPet.rejected,(state,action)=>{
            state.error=action.payload
        })
        .addCase(getPetsByUser.fulfilled,(state,action)=>{
            state.petsDashboard=action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getPetsByUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getPetsByUser.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(createPetThunk.fulfilled,(state,action)=>{
            state.pets.push(action.payload)
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(createPetThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createPetThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            state.success=false
        })
        .addCase(addImageThunk.fulfilled,(state,action)=>{
            if(state.pet){
                state.pet.images=[...state.pet.images,action.payload]
            }
            state.loading=false
            state.error=null
        })
        .addCase(addImageThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addImageThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(updatePetThunk.fulfilled,(state,action)=>{
            state.pet=action.payload
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(updatePetThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(updatePetThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            state.success=false
        })
        .addCase(deletePetThunk.fulfilled,(state,action)=>{
            state.pets=state.pets.filter((pet)=>pet._id !== action.payload.id)
            state.petsDashboard=state.petsDashboard.filter((pet)=>pet._id !== action.payload.id)
            state.loading=false
            state.error=null
        })
        .addCase(deletePetThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deletePetThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export const {resetSuccess,resetPet,resetPetsDashBoard}=petsSlice.actions
export default petsSlice.reducer

