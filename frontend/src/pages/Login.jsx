import React, { useContext, useRef, useState } from 'react'
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const { setAuth, setPersist } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)
    setError("")

    try {
      const response = await axios.post('/login', {email, password}, 
      {
        headers: { 'Content-Type' : 'application/json' },
        withCredentials: true
      }
      )
      setIsLoading(false)
      setIsSuccess(true)
      const role = response?.data.role
      const accessToken = response?.data.accessToken
      setAuth({ email, role, accessToken })
      setPersist(true)
      localStorage.setItem("persist", true)
      setEmail('')
      setPassword('')
      navigate(from, { replace: true })
    } catch(err) {
      console.log(err)
      setIsLoading(false)
      setError(err.message)
      
    }
  }

  return (
    <main className='form-signin w-100 m-auto'>
        <form className='signin' onSubmit={(e)=>handleLogin(e)}>
            <h1 className='text-center mb-5'>Sign in</h1>
            <input type="email" className="form-control mb-2" placeholder='Email Address' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" className="form-control mb-2" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button disabled={!email || !password || isLoading} type="submit" className='btn btn-primary w-100'>{isLoading ? "Loading" : "Login"}</button>

            {error &&
              <div class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                  {error}
              </div>}

            

            {isSuccess &&
              <div class="alert alert-success d-flex align-items-center mt-2" role="alert">
                You are signed in
              </div>}

        </form>
    </main>
  )
}

export default Login