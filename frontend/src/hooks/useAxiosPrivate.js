// import { axiosPrivate } from "../api/axios";
import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import useAuth from "./useAuth";
const BASE_URL = process.env.NODE_ENV == "production" ? "https://mcpc-admin-api.onrender.com" : "http://localhost:3000"

const useAxiosPrivate = async () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth()

    const axiosPrivate = axios.create({
        baseURL: BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log(config);
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;