import axios from 'axios'

const http = axios.create({
    baseURL: 'https://faceprog.ru/reactcourseapi/',
    timeout: 10000
})

export default http;