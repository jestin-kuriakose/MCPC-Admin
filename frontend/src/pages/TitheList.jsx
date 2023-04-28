import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import baseURL from "../http.js"
import Tithes from '../components/Tithes.jsx'

const TitheList = ({count}) => {

  return (

    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className="d-flex mt- align-items-center">
                    <h2 className='fw-normal'>Tithes</h2>
                    <Link to={'/newTithe'} className="btn btn-outline-primary btn-sm ms-3 h-75 ">Add New Tithe Info</Link>
                </div>

                <Tithes count={10}/>

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
                </main>
            </div>
        </div>
    </>
  )
}

export default TitheList