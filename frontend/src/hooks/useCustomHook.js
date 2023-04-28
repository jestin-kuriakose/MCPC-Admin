import { useMutation } from "@tanstack/react-query"
import { loginReq } from "../apiCalls"
import axios from "axios"
import baseURL from "../http"

export const useCustomHook = (loginInfo) => {
    console.log(loginInfo)
    const mutation = useMutation({
        mutationFn: async()=> {
            return await axios.post(baseURL + '/user/login', loginInfo)
        },
        onSuccess: (data, variables, context) => {
          console.log(data)
        },
        onError: (error, variables, context) => {
          console.log(error)
        },
        onSettled: (data, error, variables, context) => {
          
        },
      })
      return mutation
}