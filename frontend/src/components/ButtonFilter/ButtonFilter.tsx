import styles from './ButtonFilter.module.css'
import { FaFilter } from 'react-icons/fa'
import { FaFilterCircleXmark } from 'react-icons/fa6'
import useFilter from '../../hooks/useFilter'

function ButtonFilter() {

  const {showButtonFilter,handleCloseFilter,handleOpenFilter}=useFilter()

  return (
    <>
      {!showButtonFilter ? 
        <button className={styles.buttonOpenFilter} onClick={handleOpenFilter}><FaFilter/></button> 
        : 
        <button className={styles.buttonCloseFilter} onClick={handleCloseFilter}><FaFilterCircleXmark /></button>
      }
    </>
  )
}

export default ButtonFilter
