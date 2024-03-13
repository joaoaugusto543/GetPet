import { useEffect } from 'react'
import closeNavBar from '../scripts/closeNavBar'
import { useAppDispatch } from '../store'
import { hideNavBarThunk } from '../slices/buttonSlices'

function useCloseNavBar() {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    closeNavBar()
    dispatch(hideNavBarThunk())
  },[])
}

export default useCloseNavBar
