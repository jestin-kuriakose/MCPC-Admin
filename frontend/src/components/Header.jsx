import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to={'/dashboard'} class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">MCPC</Link>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                <a class="nav-link px-3" type='button' data-bs-toggle="modal" data-bs-target="#signOutModal">Sign out</a>
                </div>
            </div>
        </header>

        {/* Modal Component */}
        <div class="modal fade" id="signOutModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="saveModalLongTitle">Sign Out</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to sign out ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-danger">Sign Out</button>
                </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Header