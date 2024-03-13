import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import filter from '../scripts/filter'
import InitialStatePet from '../interfaces/InitialStatePet'
import DataFilterPets from '../interfaces/DataFilterPets'

import { 

    acceptAdoption,
    addCandidates, 
    addImage, 
    createPet, 
    deletePet, 
    getMyPets, 
    getPetDashboard, 
    rejectAdoption, 
    showPet, 
    showPets, 
    showPetsByUser, 
    updatePet 

} from '../services/petServices'

import { DataPet } from '../interfaces/DataPet'

const initialState:InitialStatePet={
    pets:[],
    petsDashboard:[],
    myPets:[],
    petDashboard:null,
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

    const res= await showPet(id)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res
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

export const addCandidatesThunk=createAsyncThunk('pets/addCandidates',async (data:{token:string,id:string},ThunkAPI)=>{

    const {token,id}=data

    const res= await addCandidates(token,id)

    if(res.error){
        return ThunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const getPetDashboardThunk=createAsyncThunk('pets/getPetDashboard',async (data:{id:string,token:string},thunkAPI) =>{

    const {id,token}=data

    const res= await getPetDashboard(id,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const acceptAdoptionThunk=createAsyncThunk('pets/acceptAdoption',async (data:{idPet:string,idUser:string,token:string},thunkAPI) =>{

    const {idPet,idUser,token}=data

    const res= await acceptAdoption(idPet,idUser,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const rejectAdoptionThunk=createAsyncThunk('pets/rejectAdoption',async (data:{idPet:string,idUser:string,token:string},thunkAPI) =>{

    const {idPet,idUser,token}=data

    const res= await rejectAdoption(idPet,idUser,token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
    }

    return res
})

export const getMyPetsThunk=createAsyncThunk('pets/getMyPets',async (data:{token:string},thunkAPI) =>{

    const {token}=data

    const res= await getMyPets(token)

    if(res.error){
        return thunkAPI.rejectWithValue(res.error)
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
        resetError:function(state){
            state.error=null
        },
        resetPet:function(state){
            state.pet=null
            state.pet=null
        },
        resetPetDashboard:function(state){
            state.petDashboard=null
        },
        resetPetsDashBoard:function(state){
            state.petsDashboard=[]
        },
        clear:function(state){
            state.error=null
            state.loading=false
            state.petsDashboard=[]
            state.petDashboard=null
            state.success=false
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
            state.pet=null
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
            state.success=false
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
            state.petDashboard=action.payload
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
        .addCase(addCandidatesThunk.fulfilled,(state,action)=>{
            if(state.pet){
                state.pet.candidates.push(action.payload)
            }
            state.loading=false
            state.error=null
        })
        .addCase(addCandidatesThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addCandidatesThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(getPetDashboardThunk.fulfilled,(state,action)=>{
            state.petDashboard=action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getPetDashboardThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getPetDashboardThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(acceptAdoptionThunk.fulfilled,(state,action)=>{
            state.petsDashboard=state.petsDashboard.filter((pet)=> pet._id !== action.payload.id)
            state.loading=false
            state.error=null
            state.success=true
        })
        .addCase(acceptAdoptionThunk.pending,(state)=>{
            state.loading=true
            state.error=null
            state.success=false
        })
        .addCase(acceptAdoptionThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            state.success=false
        })
        .addCase(rejectAdoptionThunk.fulfilled,(state,action)=>{
            if(state.petDashboard){
                state.petDashboard.candidates = state.petDashboard.candidates.filter((candidate)=> candidate.id !== action.payload.id)
            }
            state.loading=false
            state.error=null
        })
        .addCase(rejectAdoptionThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(rejectAdoptionThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        .addCase(getMyPetsThunk.fulfilled,(state,action)=>{
            state.myPets = action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getMyPetsThunk.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getMyPetsThunk.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
    }
})

export const {resetSuccess,resetPet,resetPetsDashBoard,clear,resetPetDashboard,resetError}=petsSlice.actions
export default petsSlice.reducer

