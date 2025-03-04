import axios from 'axios'

function createHttpPlugin(baseURL){
    const http = axios.create({
        baseURL,
        timeout: 10000
    })
return http;
}

export default createHttpPlugin;