import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import baseURL from "../http"

export const useDataFetch = () => {
    // const splitEndpoint = endpoint.split('/')
    // const len = splitEndpoint.length - 1
    // const key = splitEndpoint.slice(-len)

    return useQuery({
        queryKey: ['member'],
        queryFn: async() => {
            const { data } = await axios.get(baseURL + '/member')
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

// export const useDataFetch = (endpoint) => {
//     const splitEndpoint = endpoint.split('/')
//     const len = splitEndpoint.length - 1
//     const key = splitEndpoint.slice(-len)

//     return useQuery({
//         queryKey: key,
//         queryFn: async() => {
//             const { data } = await axios.get(baseURL + endpoint)
//             return { data }
//         }
//     })
// }