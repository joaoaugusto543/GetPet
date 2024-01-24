import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Pet from './pages/Pet/Pet'

function App() {


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pet/:id' element={<Pet/>}/>
      </Routes>
    </>
  )
}

export default App
