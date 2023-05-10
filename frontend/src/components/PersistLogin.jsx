import React, { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()

    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            console.log("inside function")
            try {
                await refresh() 
            } catch(err) {
                console.log(err)
            } finally{
                isMounted && setIsLoading(false)
            }
        }
        console.log("outside function")
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false;

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

  return (
    <>
        {!persist ? <Outlet/> : isLoading ? <p>Loading...</p> : <Outlet/>}
    </>
  )
}

export default PersistLogin