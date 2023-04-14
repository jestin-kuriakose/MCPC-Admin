import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import baseURL from "../http.js"

const Members = () => {
    const [members, setMembers] = useState([])
    useEffect(()=> {
        const getMembers = async () => {
            const res = await axios.get(baseURL + "/member")
            console.log(res.data)
            setMembers(res.data)
        }
        getMembers()
    },[])

    if (!members) {
        throw new Promise(resolve => setTimeout(resolve, 1000));
      }

  return (
    <>

        {members?.map((member) => (
            <tr>
                <td>{member.id}</td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.city}</td>
                <td>{member.active ? "Yes" : "No"}</td>
                <td><Link className='btn btn-primary btn-sm' to={`/member/${member.id}`}>Edit</Link><button type='button' data-bs-toggle="modal" data-bs-target="#deleteMemberModal" className='btn btn-danger btn-sm ms-sm-1' to={`/member/${member.id}`}>Delete</button></td>
            </tr>
        ))}
        
    </>
  )
}

export default Members