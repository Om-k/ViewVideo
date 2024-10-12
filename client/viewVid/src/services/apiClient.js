import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    params:{
        key:""
    },
    withCredentials: true,
})

export default apiClient