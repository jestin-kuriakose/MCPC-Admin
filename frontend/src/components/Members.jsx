import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDataFetch } from '../hooks/use-datafetch.js';
import { CSVLink } from "react-csv"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Modal from './Modal.jsx';

const Members = ({count}) => {
    const axiosPrivate = useAxiosPrivate()
    const [members, setMembers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [deleteId, setDeleteId] = useState()
    const navigate = useNavigate()

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

    const handleDelete = async() => {
        try {
            const response = await axiosPrivate.delete(`/member/${deleteId}`)
            console.log(response.data)
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <>
        <div className="table-responsive">
            { members && <CSVLink data={members} className='btn btn-primary my-3 btn-sm' filename={"members.csv"}>Export to Excel</CSVLink>}
            
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
                        <td key={6}><Link className='btn btn-primary btn-sm' to={`/member/${member.id}`}>Edit</Link><button type='button' data-bs-toggle="modal" data-bs-target="#saveModal" className='btn btn-danger btn-sm ms-sm-1' onClick={()=>setDeleteId(member.id)}>Delete</button></td>
                    </tr>
                ))
                : 
                    Array(count).fill(<TableSkeleton/>)
                }

                </tbody>
            </table> 
        </div>
        <Modal handleClick={handleDelete} type={"Member"} action={'Delete'}/>
    </>
  )
}

export default Members