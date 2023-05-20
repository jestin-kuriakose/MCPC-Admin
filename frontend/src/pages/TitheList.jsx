import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
const Tithes = React.lazy(()=> import("../components/Tithes"))

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
                <Suspense fallback={<Loading/>}>
                    <Tithes count={10}/>
                </Suspense>
                
                </main>
            </div>
        </div>
    </>
  )
}

export default TitheList