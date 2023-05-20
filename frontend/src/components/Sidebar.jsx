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
                    {/* <Link to={'/reports'} className="nav-link" href="#">
                    <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                    Reports
                    </Link> */}
                    
                </li>
                </ul>

                <Link to={'/weeklyTithe'} className="btn btn-primary mt-4 mx-2">Add Weekly Tithe</Link>

                <div className="accordion mt-5" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <Link to={'/reports'} className="nav-link" href="#">
                                <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                    Reports
                            </Link>
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <Link to={'/reports'} className="nav-link" href="#">
                            <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                Dashboard
                        </Link>
                        <Link to={'/reports/donationSlips'} className="nav-link mt-2" href="#">
                            <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                Donation Slips
                        </Link>
                        <Link to={'/reports/titheReports'} className="nav-link mt-2" href="#">
                            <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                Tithe Reports
                        </Link>
                        </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </nav>
    </>
  )
}

export default Sidebar