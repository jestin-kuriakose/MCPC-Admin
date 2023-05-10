import React, { useEffect, useState } from 'react'
import Members from './Members'
import Tithes from './Tithes'
import { Link } from 'react-router-dom'
import { useFetchTitheAmount } from '../hooks/use-datafetch'
import axios from 'axios'
import baseURL from '../http'
import { fetchTotalTithe } from '../apiCalls'

/////////////////////////////////////////////////
import useAuth from "../hooks/useAuth.js"
import useRefreshToken from '../hooks/useRefreshToken.js';
const BASE_URL = process.env.NODE_ENV == "production" ? "https://mcpc-admin-api.onrender.com" : "http://localhost:3000"
////////////////////////////////////////////////

const Dashboard = () => {
  const [totalTithe, setTotalTithe] = useState(0)

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
            response => {
              return response
            },
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

  useEffect(()=> {
    const fetchData = async() => {
      try {
        const res = await axiosPrivate.get('/tithe/reports/totalAmount')
        setTotalTithe(res.data.amount)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
},[totalTithe])

  return (
    <>
        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <h1 className='text-center py-2'>Dashboard</h1>
        </div>

        <div className="container-fluid">
          <div className="row">
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="row align-items-center justify-content-center gap-4 mb-5">

                <div className="card col-lg-3 col-6 text-center">
                  <div className="card-body">
                    <h1 className="card-title">120</h1>
                    <p className='card-text'>Total Members</p>
                  </div>
                </div>

                <div className="card col-lg-3 col-6 text-center">
                  <div className="card-body">
                    <h1 className="card-title">$ {totalTithe}</h1>
                    <p className='card-text'>Total Tithe in 2023</p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="d-flex gap-3">
                  <h3>Members</h3>
                  <Link to={'/members'}><button className="btn btn-outline-primary btn-sm">View all</button></Link>
                </div>

                <Members count={5}/>
              </div>

              <div className="mt-5">
                <div className="d-flex gap-3">
                  <h3>Tithes</h3>
                  <Link to={'/tithes'}><button className="btn btn-outline-primary btn-sm">View all</button></Link>
                </div>
                <Tithes count={5}/>
              </div>


            </main>
          </div>
        </div>
        


    </>
  )
}

export default Dashboard