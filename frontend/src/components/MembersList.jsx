import React, { Suspense, useEffect, useState } from 'react'
import { tithes } from '../dummyData'
import { Link } from 'react-router-dom'
import axios from "axios"
const Members = React.lazy(()=>import('./Members'))
import Loading from './Loading'
import baseURL from "../http.js"

const MembersList = () => {
  
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className="d-flex mt- align-items-center">
                    <h2 className='fw-normal'>Members</h2>
                    <Link to={'/newMember'} className="btn btn-outline-primary btn-sm ms-3 h-75">Add a New Member</Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Suspense fallback={<Loading />}>
                            <Members />
                        </Suspense>
                    </tbody>
                    
                    </table>

                    {/* Modal Component */}
                    <div className="modal fade" id="deleteMemberModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveModalLongTitle">Delete Member</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this member ?
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

export default MembersList