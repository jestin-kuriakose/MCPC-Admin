import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
const Members = React.lazy(()=>import('../components/Members'))

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
                        <Suspense fallback={<Loading/>}>
                            <Members count={50}/>
                        </Suspense>
                </main>
            </div>
        </div>
    </>
  )
}

export default MembersList