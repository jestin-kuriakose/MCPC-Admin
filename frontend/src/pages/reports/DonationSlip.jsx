import React, { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataFetch, useFetchTotalTithe } from '../../hooks/use-datafetch'
import axios from 'axios'
import baseURL from '../../http'
import { CSVLink } from 'react-csv'


const DonationSlip = () => {

    const [titheData, setTitheData] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=> {
        setIsLoading(true)
        const fetchData = async () =>  {
            const fromDate = `1/1/${year}`
            const toDate = `12/31/${year}`
            const res = await axios.get( baseURL + `/tithe/reports/titheTotal?fromDate=${fromDate}&toDate=${toDate}` )
            setTitheData(res.data)
            setIsLoading(false)
        }
        fetchData()
    },[year])

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

                <h2 className='fw-normal mt-3'>Donataion Slips</h2>
                <p className='lead lh-1'>View or download Donation Slips here</p>
                { titheData && <CSVLink data={titheData} className='btn btn-primary my-3 btn-sm' filename={`Donation_Summary_${year}.csv`} target="_blank">Export to Excel</CSVLink>}
                <div className='col-sm-3 col-lg-2 col-xl-1' >
                    <label htmlFor="" className="form-label fs-4 fw-light">Tax Year</label>
                    <select name="year" id="year" className="form-select" defaultValue={"2023"} onChange={e => setYear(e.target.value)}>
                        <option value="2020" className="">2020</option>
                        <option value="2021" className="">2021</option>
                        <option value="2022" className="">2022</option>
                        <option value="2023" className="">2023</option>
                    </select>
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
                            <td key={5}>
                                <Link target="_blank" rel="noopener noreferrer" className='btn btn-primary btn-sm' 
                                        to={`/pdfView/?memberId=${tithe?.memberId}&firstName=${tithe?.member?.firstName}&lastName=${tithe?.member?.lastName}&year=${year}&address1=${tithe.member.address1}&address2=${tithe.member.address2}&city=${tithe.member.city}&province=${tithe.member.province}&country=${tithe.member.country}&postalCode=${tithe.member.postalCode}&titheAmount=${tithe?.totalAmount}`}>
                                            View</Link>       
                                <Link target="_blank" rel="noopener noreferrer" className='btn btn-primary btn-sm ms-2' 
                                        to={`/pdfDownload/?memberId=${tithe?.memberId}&firstName=${tithe?.member?.firstName}&lastName=${tithe?.member?.lastName}&year=${year}&address1=${tithe.member.address1}&address2=${tithe.member.address2}&city=${tithe.member.city}&province=${tithe.member.province}&country=${tithe.member.country}&postalCode=${tithe.member.postalCode}&titheAmount=${tithe?.totalAmount}`}>
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