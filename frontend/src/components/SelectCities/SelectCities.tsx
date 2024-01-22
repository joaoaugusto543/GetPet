import { Key } from 'react'
import useFetchCities from '../../hooks/useFetchCities'

type Props={
    setCity:Function,
    uf:String,
    city:String
}

function SelectCities({setCity,uf,city}:Props) {

  const cities=useFetchCities({uf})

  return (
    <select name='cities' value={typeof(city) === 'string' ? city : ''} onChange={(e)=>setCity(e.target.value)}>
        <option value=''>Selecione uma cidade</option>
        {cities.length !== 0 && cities.map((citie:any,index:Key) => <option key={index} value={citie}>{citie}</option>)}
    </select>
  )
}

export default SelectCities