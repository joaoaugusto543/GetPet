import { Key } from 'react'
import useFetchUfs from '../../hooks/useFetchUfs'

type Props={
    setUf:Function,
    uf:String
}

function SelectUfs({setUf,uf}:Props) {

  const ufs=useFetchUfs()

  return (
    <select name='ufs' value={typeof(uf) === 'string' ? uf : ''} onChange={(e)=>setUf(e.target.value)}>
        <option value=''>Selecione um estado</option>
        {ufs.length !== 0 && ufs.map((uf:any,index:Key) => <option key={index} value={uf}>{uf}</option>)}
    </select>
  )
}

export default SelectUfs
