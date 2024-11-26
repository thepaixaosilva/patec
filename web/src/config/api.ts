import axios from "axios"

const api = axios.create({
    baseURL: "http://patec-api.onrender.com"
})

export default api