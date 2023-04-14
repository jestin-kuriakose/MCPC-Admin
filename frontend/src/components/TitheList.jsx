import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import baseURL from "../http.js"

const TitheList = () => {
    const [members, setMembers] = useState([])
    const [tithes, setTithes] = useState([])

    useEffect(()=> {
        const getMembers = async() => {
            try{
                const res = await axios.get(baseURL + "/member")
                setMembers(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getMembers()
    }, [])

    useEffect(()=> {
        const getTithes = async() => {
            try {
                const res = await axios.get(baseURL + "/tithe")
                setTithes(res.data)
            } catch(err) {
                console.log(err)
            }

        }
        getTithes()
    }, [])

    const findMember = (tithe, query) => {
        const member = members?.find(member => member.id == tithe.member)
        if (query == "firstName"){
            return member?.firstName
        } else {
            return member?.lastName
        }  
    }

  return (

    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className="d-flex mt- align-items-center">
                    <h2 className='fw-normal'>Tithes</h2>
                    <Link to={'/newTithe'} className="btn btn-outline-primary btn-sm ms-3 h-75 ">Add New Tithe Info</Link>
                </div>


                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th key={1} scope="col">ID</th>
                            <th key={2} scope="col">Date</th>
                            <th key={3} scope="col">First Name</th>
                            <th key={4} scope="col">Last Name</th>
                            <th key={5} scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tithes?.map((tithe) => (
                            <tr key={tithe.id}>
                                <td key={1}>{tithe.id}</td>
                                <td key={2}>{tithe.date}</td>
                                <td key={3}>{findMember(tithe, "firstName")}</td>
                                <td key={4}>{findMember(tithe, "lastName")}</td>
                                <td key={5}>$ {tithe.amount}</td>
                                <td key={6}><Link className='btn btn-primary btn-sm' to={`/tithe/${tithe.id}`}>Edit</Link><button className="btn btn-danger btn-sm ms-sm-1" data-bs-toggle="modal" data-bs-target="#deleteTitheModal">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>

                    {/* Modal Component */}
                    <div className="modal fade" id="deleteTitheModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveModalLongTitle">Delete Tithe Info</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this Tithe Info ?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </main>
            </div>
        </div>
    </>
  )
}

export default TitheList