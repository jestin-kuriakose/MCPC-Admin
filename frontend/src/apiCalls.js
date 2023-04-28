import axios from "axios"
import baseURL from "./http"

export const fetchMembers = async () => {
    const { data } = await axios.get(baseURL + '/member')
    return { data }
}

export const fetchTithes = async () => {
    const { data } = await axios.get(baseURL + '/tithe')
    return { data }
}

export const loginReq = async (loginInfo) => {
    return await axios.post(baseURL + '/user/login', loginInfo)
}