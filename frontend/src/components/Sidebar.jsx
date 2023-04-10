import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <Link to={'/dashboard'} class="nav-link" aria-current="page" href="#">
                    <span data-feather="home" class="align-text-bottom"></span>
                    Dashboard
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={'/members'} class="nav-link" href="#">
                    <span data-feather="file" class="align-text-bottom"></span>
                    Members
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={'/tithes'} class="nav-link" href="#">
                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                    Tithe
                    </Link>
                </li>

                <li class="nav-item">
                    <Link to={'/reports'} class="nav-link" href="#">
                    <span data-feather="bar-chart-2" class="align-text-bottom"></span>
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