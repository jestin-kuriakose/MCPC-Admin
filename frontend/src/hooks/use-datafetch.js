import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import baseURL from "../http"

export const useDataFetch = async () => {
    const accessToken = await localStorage.getItem("accessToken")
    console.log(accessToken)
    return useQuery({
        queryKey: ['member'],
        queryFn: async() => {
            const { data } = await axios.get(baseURL + '/member', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return { data }
        }
    })
}

export const useFetchData = () => {
    return useQuery({
      queryKey: ['member'],
      queryFn: () => request('/member'),
    });
  }


export const useFetchTitheAmount = (endpoint) => {
    return useQuery({
        queryKey: ['reports', 'amount'],
        queryFn: async() => {
            const { data } = await axios.get(baseURL + endpoint)
            return { data }
        }
    })
}

export const useFetchTotalTithe = (endpoint) => {
    return useQuery({
        queryKey: ['reports', 'totalTitheAmount'],
        queryFn: async() => {
            const { data } = await axios.get(baseURL + endpoint)
            return { data }
        }
    })
}