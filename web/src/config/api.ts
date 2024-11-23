import axios from "axios"

const api = axios.create({
    baseURL: "https://patec-api.onrender.com/"
})

export default api