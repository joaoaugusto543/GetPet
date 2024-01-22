import closeFilter from '../scripts/closeFilter'
import openFilter from '../scripts/openFilter'
import { showButtonCloseFilter, showButtonOpenFilter } from '../slices/filterSlices'
import { useAppDispatch, useAppSelector } from '../store'

function useFilter() {
    const {open}=useAppSelector((state)=>state.filter)
    const dispatch=useAppDispatch()

    function handleOpenFilter(){
        dispatch(showButtonCloseFilter())
        openFilter()
    }
    
    function handleCloseFilter(){
        dispatch(showButtonOpenFilter())
        closeFilter()
    }

    return {open,handleCloseFilter,handleOpenFilter}
}

export default useFilter
