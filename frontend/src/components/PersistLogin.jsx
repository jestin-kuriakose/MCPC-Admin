import React, { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh() 
            } catch(err) {
                console.log(err)
            } finally{
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

  return (
    <>
        {isLoading ? <p>Loading...</p> : <Outlet/>}
    </>
  )
}

export default PersistLogin