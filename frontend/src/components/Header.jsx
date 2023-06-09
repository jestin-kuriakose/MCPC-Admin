import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import Modal from './Modal'

const Header = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/logout', JSON.stringify({}))
            localStorage.clear()
            setAuth({})
            navigate('/login')

        } catch(err) {
            console.log(err)
        }
    }
  return (
    <>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <Link to={'/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">MCPC</Link>
            <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                <a className="nav-link px-3" type='button' data-bs-toggle="modal" data-bs-target="#signOutModal">Sign Out</a>
                </div>
            </div>

        </nav>

       

        <div className="modal fade" id="signOutModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="saveModalLongTitle">Sign out User ? </h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure you want to Sign out?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleLogout} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                    {/* {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Yes"} */}
                    Yes
                    </button>
                </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Header