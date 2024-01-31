import './App.css'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Pet from './pages/Pet/Pet'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import { useAppSelector } from './store'

function App() {

  const {token} = useAppSelector(state => state.auth)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pet/:id' element={<Pet/>}/>
        <Route path='/register' element={!token ? <Register/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!token ? <Login/> : <Navigate to='/'/>}/>
      </Routes>
    </>
  )
}

export default App
