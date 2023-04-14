import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link" aria-current="page" href="#">
                    <span data-feather="home" className="align-text-bottom"></span>
                    Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/members'} className="nav-link" href="#">
                    <span data-feather="file" className="align-text-bottom"></span>
                    Members
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/tithes'} className="nav-link" href="#">
                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                    Tithe
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/reports'} className="nav-link" href="#">
                    <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                    Reports
                    </Link>
                </li>
                </ul>

                <div className="btn btn-primary mt-4 mx-2">Add Weekly Tithe</div>
            </div>
            </nav>
    </>
  )
}

export default Sidebar