import axios from "axios"
import baseURL from "./http"

export const fetchMembers = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const { data } = await axios.get(baseURL + '/member', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return { data }
}

export const fetchTithes = async () => {
    const { data } = await axios.get(baseURL + '/tithe')
    return { data }
}

export const loginReq = async (loginInfo) => {
    return await axios.post(baseURL + '/login', loginInfo)
}

export const fetchTotalTithe = async(endpoint) => {
    return await axios.get(baseURL + endpoint)
}