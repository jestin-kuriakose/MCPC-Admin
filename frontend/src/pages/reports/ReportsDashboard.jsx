import React from 'react'
import { Link } from 'react-router-dom'

const ReportsDashboard = () => {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <h2 className='fw-normal mt-3'>Reports</h2>
                <p className='lead lh-1'>View or download different reports here</p>


                <div class="row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Donation Slips</h5>
                                <p class="card-text">You can generate Donation slips here for tax purposes.</p>
                                <Link to={'/reports/donationSlips'} class="btn btn-primary">Generate Donation Slips</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Tithe Report</h5>
                                <p class="card-text">You can generate different reports here related to Tithe.</p>
                                <Link to={'/reports/donationSlips'} class="btn btn-primary">Generate Tithe Reports</Link>
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

export default ReportsDashboard