import React, { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from './Loading'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh() 
            } catch(err) {
                console.log(err)
            } finally{
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false;

    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    // }, [isLoading])

  return (
    <>
        {!persist ? <Outlet/> : isLoading ? <Loading/> : <Outlet/>}
    </>
  )
}

export default PersistLogin