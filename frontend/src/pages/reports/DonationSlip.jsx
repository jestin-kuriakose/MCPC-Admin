import React, { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataFetch } from '../../hooks/use-datafetch'


const DonationSlip = () => {

    const [members, setMembers] = useState([])

    const { data, isLoading, isError, error } = useDataFetch('/member')

    if(isError) {
        console.log(error.message)
    }

    useEffect(()=> {
        setMembers(data?.data)
    },[data])

    const TableSkeleton = () => (
        <tr>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
            <td key={''} className='skeleton'>{"  .   "}</td>
        </tr>
    )

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <h2 className='fw-normal mt-3'>Donataion Slips</h2>
                <p className='lead lh-1'>View or download Donation Slips here</p>

                <table className="table table-striped table-sm ">
                    <thead>
                        <tr>
                            <th key={''} scope="col">ID</th>
                            <th key={''} scope="col">First Name</th>
                            <th key={''} scope="col">Last Name</th>
                            <th key={''} scope="col">City</th>
                        </tr>
                    </thead>
                    <tbody className=''>

                    {!isLoading ? members?.map((member, index) => (
                        // index < count &&
                        <tr key={index}>
                            <td key={''}>{member.id}</td>
                            <td key={''}>{member.firstName}</td>
                            <td key={''}>{member.lastName}</td>
                            <td key={''}>{member.city}</td>
                            <td key={''}>
                                <Link className='btn btn-primary btn-sm' 
                                        to={`/pdfView/?firstName=${member?.firstName}&lastName=${member?.lastName}&year=2023`}>
                                            View</Link>       
                                <Link className='btn btn-primary btn-sm ms-2' 
                                        to={`/pdfDownload/?firstName=${member?.firstName}&lastName=${member?.lastName}&year=2023`}>
                                            Download</Link>
                            </td>
                        </tr>
                    ))
                    : 
                        Array(10).fill(<TableSkeleton/>)
                    }

                    </tbody>
                </table> 

                </main>
            </div>
        </div>
    </>
  )
}

export default DonationSlip