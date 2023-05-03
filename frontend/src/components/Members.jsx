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
        <tr>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
        </tr>
    )

  return (
    <>
        <div className="table-responsive">
            { members && <CSVLink data={members} className='btn btn-primary my-3 btn-sm' filename={"members.csv"} target="_blank">Export to Excel</CSVLink>}
            <table className="table table-striped table-sm ">
                <thead>
                    <tr>
                        <th key={''} scope="col">ID</th>
                        <th key={''} scope="col">First Name</th>
                        <th key={''} scope="col">Last Name</th>
                        <th key={''} scope="col">City</th>
                        <th key={''} scope="col">Active</th>
                    </tr>
                </thead>
                <tbody className=''>

                {!isLoading ? members?.map((member, index) => (
                    index < count &&
                    <tr key={index}>
                        <td key={''}>{member.id}</td>
                        <td key={''}>{member.firstName}</td>
                        <td key={''}>{member.lastName}</td>
                        <td key={''}>{member.city}</td>
                        <td key={''}>{member.active ? "Yes" : "No"}</td>
                        <td key={''}><Link className='btn btn-primary btn-sm' to={`/member/${member.id}`}>Edit</Link><button type='button' data-bs-toggle="modal" data-bs-target="#deleteMemberModal" className='btn btn-danger btn-sm ms-sm-1' to={`/member/${member.id}`}>Delete</button></td>
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