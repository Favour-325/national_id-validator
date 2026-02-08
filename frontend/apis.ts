import axios from "axios"


export const API = axios.create({baseURL: "http://localhost:8000"})

export const get_all = async () => {
    return await API.get('/', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

export const validate = async (request: object) => {
    console.log(request)
    return await API.post('/validate', request, {
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }
    })
}

export const create = async (data: object) => {
    return await API.post('/create', data, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}