const fetch=require('node-fetch')

async function getStates(){
    const response=await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')

    const data=await response.json()

    const ufs=data.map((uf) => uf.sigla)

    return ufs
}

module.exports= getStates