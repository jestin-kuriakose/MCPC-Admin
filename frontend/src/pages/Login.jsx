import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginReq } from '../apiCalls'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: loginReq,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["user", "login"])
    },
    onError: (error, variables, context) => {
      console.log(error)
    },
    onSettled: (data, error, variables, context) => {
      
    },
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    mutation.mutate({email, password})
  }

  return (
    <main className='form-signin w-100 m-auto'>
        <form className='signin' onSubmit={(e)=>handleLogin(e)}>
            <h1 className='text-center mb-5'>Sign in</h1>
            <input type="email" className="form-control mb-2" placeholder='Email Address' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" className="form-control mb-2" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button disabled={!email || !password || mutation.isLoading} type="submit" className='btn btn-primary w-100'>Login</button>

            {mutation.isError &&
              <div class="alert alert-danger d-flex align-items-center mt-2" role="alert">
                  {mutation.error.message}
              </div>}

            {mutation.isSuccess && 
            <div class="alert alert-success d-flex align-items-center mt-2" role="alert">
                You are signed in
            </div>}
        </form>
    </main>
  )
}

export default Login