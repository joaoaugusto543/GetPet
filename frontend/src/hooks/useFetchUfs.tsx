import { useCallback, useEffect, useState } from 'react'
import localidades from '../api/localidades'

function useFetchUfs() {
  const [ufs,setUfs]=useState<String[]>([])

  const loadData= useCallback(async ()=>{

    const response=await localidades.get(`/estados/`)

    const {data}=response

    const ufs=data.map((uf:any) => uf.sigla)

    setUfs(ufs)

  },[])

  useEffect(()=>{
    loadData()
  },[loadData])

  return ufs.sort()

}

export default useFetchUfs
