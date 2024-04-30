import axios from "axios";

const request = axios.create({
    baseURL: "https://662defe7a7dda1fa378b9803.mockapi.io/",
    timeout: 10000
})

export default request