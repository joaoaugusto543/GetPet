import closeFilter from '../scripts/closeFilter'
import openFilter from '../scripts/openFilter'
import { showButtonCloseFilter, showButtonOpenFilter } from '../slices/buttonSlices'
import { useAppDispatch, useAppSelector } from '../store'

function useFilter() {
    const {showButtonFilter}=useAppSelector((state)=>state.button)
    const dispatch=useAppDispatch()

    function handleOpenFilter(){
        dispatch(showButtonCloseFilter())
        openFilter()
    }
    
    function handleCloseFilter(){
        dispatch(showButtonOpenFilter())
        closeFilter()
    }

    return {showButtonFilter,handleCloseFilter,handleOpenFilter}
}

export default useFilter
