import axios from 'axios'

const valuesApi = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/last'
})

export {valuesApi}