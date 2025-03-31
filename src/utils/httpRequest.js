import axios from "axios"

const httpRequest = axios.create({
    baseURL : "https://api01.f8team.dev/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,

    },
}) 

const send = async (method, url, data,config) => {
   try {
        const res = await httpRequest({method, url, data, ...config});
        return res.data
   } catch (error) {
        console.log(error);
        return error.response?.data
   }
}

export const get = (url, config) =>{
    return send("get", url, null, config)
}
export const post = (url, data, config) =>{
    return send("post", url, data, config)
}
export const put = (url, data, config) =>{
    return send("put", url, data, config)
}
export const patch = (url, config) =>{
    return send("patch", url, null, config)
}
export const del = (url, config) =>{
    return send("deleta", url, null, config)
}

export const setToken = (token) => {
    httpRequest.defaults.headers["Authorization"] = `Bearer ${token}`
    localStorage.setItem("token" , token)
}

export default {
    get,
    put,
    post,
    patch,
    del,
    setToken,
}