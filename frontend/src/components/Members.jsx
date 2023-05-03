import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataFetch } from '../hooks/use-datafetch.js';
import { CSVLink } from "react-csv"

const Members = ({count}) => {
    const [members, setMembers] = useState([])

    const { data, isLoading, isError, error } = useDataFetch('/member')

    if(isError) {
        console.log(error.message)
    }

    useEffect(()=> {
        setMembers(data?.data)
    },[data])

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
                        <td key={5}>{member.active ? "Yes" : "No"}</td>
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