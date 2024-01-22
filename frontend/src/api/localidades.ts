import axios from 'axios'

const localidades= axios.create({
    baseURL:'https://servicodados.ibge.gov.br/api/v1/localidades/'
})

export default localidades