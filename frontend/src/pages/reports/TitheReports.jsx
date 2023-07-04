import React, { Suspense, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const TitheReports = () => {
    
    const [titheData, setTitheData] = useState([])
    const [fromDate, setFromDate] = useState(new Date(new Date() - 30*24*60*60*1000).toLocaleDateString())
    const [toDate, setToDate] = useState(new Date().toLocaleDateString())
    const year = new Date().getFullYear()

    const [isLoading, setIsLoading] = useState(false)

    const axiosPrivate = useAxiosPrivate()

    useEffect(()=> {
        setIsLoading(true)
        const fetchData = async () =>  {
            const res = await axiosPrivate.get( `/tithe/reports/titheTotal?fromDate=${fromDate}&toDate=${toDate}` )
            setTitheData(res.data)
            setIsLoading(false)
        }
        fetchData()
    },[fromDate, toDate])

    const TableSkeleton = () => (
        <tr>
            <td key={1} className='skeleton'>{"  .   "}</td>
            <td key={2} className='skeleton'>{"  .   "}</td>
            <td key={3} className='skeleton'>{"  .   "}</td>
            <td key={4} className='skeleton'>{"  .   "}</td>
        </tr>
    )
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <h2 className='fw-normal mt-3'>Tithe Reports by Member</h2>
                <p className='lead lh-1'>View or download Tithe reports here</p>

                { titheData && <CSVLink data={titheData} className='btn btn-primary my-3 btn-sm' filename={`Donation_Summary_${year}.csv`} target="_blank">Export to Excel</CSVLink>}
                
                <div className='row'>
                    <div className='form-group col-sm-4 col-lg-3 col-xl-2' >
                        <label htmlFor="" className="form-label fs-5 fw-light">From</label>
                        <input type="date" name="fromDate" id="fromDate" className='form-control' onChange={(e) => setFromDate(new Date(e.target.value).toLocaleDateString())} defaultValue={new Date(new Date() - 30*24*60*60*1000).toISOString().split('T')[0]}/>
                    </div>
                    <div className='form-group col-sm-4 col-lg-3 col-xl-2' >
                        <label htmlFor="" className="form-label fs-5 fw-light">to</label>
                        <input type="date" name="fromDate" id="fromDate" className='form-control' onChange={(e) => setToDate(new Date(e.target.value).toLocaleDateString())} defaultValue={new Date().toISOString().split('T')[0]}/>
                    </div>
                </div>

                <table className="table table-striped table-sm ">

                    <thead>
                        <tr>
                            <th key={1} scope="col">ID</th>
                            <th key={2} scope="col">First Name</th>
                            <th key={3} scope="col">Last Name</th>
                            <th key={4} scope="col">Total Tithe</th>
                        </tr>
                    </thead>
                    <tbody className=''>

                    {!isLoading ? titheData?.map((tithe, index) => (
                        // index < count &&
                        <tr key={index}>
                            <td key={1}>{tithe.memberId}</td>
                            <td key={2}>{tithe.member.firstName}</td>
                            <td key={3}>{tithe.member.lastName}</td>
                            <td key={4}>${tithe.totalAmount}</td>
                            {/* <td key={5}>
                                <Link target='_blank' className='btn btn-primary btn-sm' 
                                        to={`/pdfView/?memberId=${tithe?.memberId}&firstName=${tithe?.member?.firstName}&lastName=${tithe?.member?.lastName}&year=${year}&address1=${tithe.member.address1}&address2=${tithe.member.address2}&city=${tithe.member.city}&province=${tithe.member.province}&country=${tithe.member.country}&postalCode=${tithe.member.postalCode}&titheAmount=${tithe?.totalAmount}`}>
                                            View</Link>       
                                <Link target='_blank' className='btn btn-primary btn-sm ms-2' 
                                        to={`/pdfDownload/?memberId=${tithe?.memberId}&firstName=${tithe?.member?.firstName}&lastName=${tithe?.member?.lastName}&year=${year}&address1=${tithe.member.address1}&address2=${tithe.member.address2}&city=${tithe.member.city}&province=${tithe.member.province}&country=${tithe.member.country}&postalCode=${tithe.member.postalCode}&titheAmount=${tithe?.totalAmount}`}>
                                            Download</Link>
                            </td> */}
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

export default TitheReports