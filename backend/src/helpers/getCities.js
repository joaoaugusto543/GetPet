const fetch=require('node-fetch')

async function getCities(uf){

    const response=await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)

    const data=await response.json()

    const cities=data.map((citie) => citie.municipio.nome)

    return cities
}

module.exports= getCities