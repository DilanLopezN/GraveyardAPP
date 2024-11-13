import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api_cemiterio.ossbrasil.com.br',
  timeout: 10000
})
