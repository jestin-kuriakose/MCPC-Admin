import axios from "axios";

const BASE_URL = process.env.NODE_ENV == "production" ? "https://mcpc-admin-api.onrender.com" : "http://localhost:3000"

export default axios.create({
    baseURL: BASE_URL,
})

export const apiClient = axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const login = async (email, password) => {
    try {
      const response = await apiClient.post('/login', { email, password },
      {
        headers: { 'Content-Type' : 'application/json' },
        withCredentials: true
      });
  
      // Handle the response and return the relevant data
      return response;
    } catch (error) {
      // Handle any errors that occurred during the login request
      throw new Error('Login failed');
    }
  };
