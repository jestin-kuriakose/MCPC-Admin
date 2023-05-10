import React, { useEffect, useState } from 'react'
import { members } from '../dummyData'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import Loading from './Loading'
import baseURL from "../http.js"

/////////////////////////////////////////////////
import useAuth from "../hooks/useAuth.js"
import useRefreshToken from '../hooks/useRefreshToken.js';
const BASE_URL = process.env.NODE_ENV == "production" ? "https://mcpc-admin-api.onrender.com" : "http://localhost:3000"
////////////////////////////////////////////////

const NewTithe = () => {
    const navigate = useNavigate()
    const [titheInfo, setTitheInfo] = useState({date: new Date().toLocaleDateString()})
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

/////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchMembers = async() => {
            try {
                const res = await axiosPrivate.get("/member")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchMembers()
    }, [])

    const handleSave = async() => {
        setIsLoading(true)
        setError("")
        try{
            const res = await axiosPrivate.post("/tithe", titheInfo)
            setIsLoading(false)
            navigate('/tithes')
        } catch(err) {
            setIsLoading(false)
            setError(err.message)
        }
        
    }
  return (
    <div className='container-fluid'>
        {isLoading ? <Loading/> : <div className="row">
            <div className="col-md-9 col-lg-10 ms-sm-auto">
                <h3 className="my-3">New Tithe</h3>
                <form action="">
                    <div className="row g-3">
                        <div className="col-sm-4">
                            <label for="member" className="form-label fw-bold">Member</label>
                            <select name="member" id="member" className="form-select" defaultValue={''} required onChange={(e)=>setTitheInfo((prev)=>({...prev, memberId: e.target.value}))}>
                                <option value="" disabled>Choose...</option>
                                    {members?.map((member) => (
                                        <option value={member.id}>{member.firstName + " " + member.lastName}</option>
                                    ))}
                            </select>
                            <div className="invalid-feedback">
                                Valid Member is required.
                            </div>
                        </div>

                        <div className="col-sm-2">
                            <label htmlFor="" className="form-label">Date</label>
                            <input onChange={(e)=>setTitheInfo((prev)=>({...prev, date: new Date(e.target.value).toLocaleDateString()}))} defaultValue={new Date().toISOString().split('T')[0]} type="date" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                        </div>
                        </div>

                        <div className="col-sm-2">
                            <label className="form-label">Amount $</label>
                            <input onChange={(e)=>setTitheInfo((prev) => ({...prev, amount: e.target.value}))} defaultValue={'0'} type="number" name="amount" id="amount" className='form-control' required/>
                            <div className="invalid-feedback">
                                Valid Member is required.
                            </div>
                        </div>

                        <div className="w-sm-25">
                            <button className="btn btn-primary w-sm-25" data-bs-toggle="modal" data-bs-target="#saveModal" type="button">Save</button>
                            <button onClick={()=>navigate(-1)} className="btn btn-danger btn-sm-sm mx-1">Cancel</button>
                        </div>
                            
                        {error == "" ? "" : <p className='bg-danger text-white text-center w-50'>{error}. Please try again</p>}
                        <Modal handleClick={handleSave} type={'tithe'}/>
                    </div>
                </form>
            </div>
        </div>}
    </div>
  )
}

export default NewTithe