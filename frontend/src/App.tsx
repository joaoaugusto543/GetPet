import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Pet from './pages/Pet/Pet'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { useAppSelector } from './store'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePet from './pages/CreatePet/CreatePet'
import EditPet from './pages/EditPet/EditPet'
import Profile from './pages/Profile/Profile'
import PetDashboard from './pages/PetDashBoard/PetDashboard'
import MyPetsPage from './pages/MyPetsPage/MyPetsPage'

function App() {

  const {token} = useAppSelector(state => state.auth)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pet/:id' element={<Pet/>}/>
        <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path='/dashboard/pet/:id' element={token ? <PetDashboard/> : <Navigate to='/login'/>}/>
        <Route path='/profile' element={token ? <Profile/> : <Navigate to='/login'/>}/>
        <Route path='/my-pets' element={token ? <MyPetsPage/> : <Navigate to='/login'/>}/>
        <Route path='/edit-pet/:id' element={token ? <EditPet/> : <Navigate to='/login'/>}/>
        <Route path='/register' element={!token ? <Register/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!token ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/create-pet' element={token ? <CreatePet/> : <Navigate to='/login'/>}/>
      </Routes>
    </>
  )
}

export default App
