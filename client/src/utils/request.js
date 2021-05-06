import axios from "axios"

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API + "/api",
    timeout: 5000
})

request.interceptors.request.use(
    req => {
        if(localStorage.getItem("token")){
            req.headers['token'] = localStorage.getItem("token")
        }
        return req
    }
)

export default request