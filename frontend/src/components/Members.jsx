import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataFetch } from '../hooks/use-datafetch.js';
import { CSVLink } from "react-csv"
import axios from '../api/axios.js';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

///////////////////////////////////////////////////////
import useAuth from "../hooks/useAuth.js"
import useRefreshToken from '../hooks/useRefreshToken.js';
const BASE_URL = process.env.NODE_ENV == "production" ? "https://mcpc-admin-api.onrender.com" : "http://localhost:3000"
//////////////////////////////////////////////////////

const Members = ({count}) => {
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    // const axiosPrivate = useAxiosPrivate()

///////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////


    useEffect(()=> {
        let isMounted = true;
        const controller = new AbortController()

        const getMemberData = async () => {
            try {
                const response = await axiosPrivate.get('/member/memberData', {
                    signal: controller.signal
                })
                isMounted && setMembers(response.data)
            } catch(err) {
                console.log(err)
            }
        }

        getMemberData()

        return () => {
            isMounted = false;
            controller.abort();
        }
        
    },[])

    const TableSkeleton = () => (
        <tr key={Math.random()*10}>
            <td key={1} className='skeleton'>{"  .   "}</td>
            <td key={2} className='skeleton'>{"  .   "}</td>
            <td key={3} className='skeleton'>{"  .   "}</td>
            <td key={4} className='skeleton'>{"  .   "}</td>
            <td key={5} className='skeleton'>{"  .   "}</td>
        </tr>
    )

  return (
    <>
        <div className="table-responsive">
            { members && <CSVLink data={members} className='btn btn-primary my-3 btn-sm' filename={"members.csv"} target="_blank">Export to Excel</CSVLink>}
            <table className="table table-striped table-sm ">
                <thead>
                    <tr>
                        <th key={1} scope="col">ID</th>
                        <th key={2} scope="col">First Name</th>
                        <th key={3} scope="col">Last Name</th>
                        <th key={4} scope="col">City</th>
                        <th key={5} scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>

                {!isLoading ? members?.map((member, index) => (
                    index < count &&
                    <tr key={index}>
                        <td key={1}>{member.id}</td>
                        <td key={2}>{member.firstName}</td>
                        <td key={3}>{member.lastName}</td>
                        <td key={4}>{member.city}</td>
                        <td key={5}>{member.active}</td>
                        <td key={6}><Link className='btn btn-primary btn-sm' to={`/member/${member.id}`}>Edit</Link><button type='button' data-bs-toggle="modal" data-bs-target="#deleteMemberModal" className='btn btn-danger btn-sm ms-sm-1' to={`/member/${member.id}`}>Delete</button></td>
                    </tr>
                ))
                : 
                    Array(count).fill(<TableSkeleton/>)
                }

                </tbody>
            </table> 
        </div>
                
    </>
  )
}

export default Members