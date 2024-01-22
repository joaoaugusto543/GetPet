import { useState, useCallback, useEffect } from 'react'
import localidades from '../api/localidades'

type Props={
    uf:String
}

function useFetchCities({uf}:Props) {

  const [cities,setCities]=useState<string[]>([])

  const loadData= useCallback(async ()=>{

    const response=await localidades.get(`/estados/${uf}/distritos`)

    const {data}=response

    const cities=data.map((citie:any) => citie.municipio.nome)

    const unduplicatedCities = cities.filter((citie:String, index:Number, self:String[]) => { 
      return self.indexOf(citie) === index;
    })

    setCities(unduplicatedCities)

  },[uf])

  useEffect(()=>{
    loadData()
  },[loadData])

  return cities.sort()


}

export default useFetchCities
