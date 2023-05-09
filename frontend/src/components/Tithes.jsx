import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import { CSVLink } from 'react-csv'

const Tithes = ({count}) => {

    const [tithes, setTithes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(()=> {
        let isMounted = true;
        let updatedData = []
        const controller = new AbortController()

        const getTitheData = async () => {
            try {
                const response = await axios.get(`/tithe/titheWithMemberData?count=${count}`, {
                    signal: controller.signal
                })

                response?.data.map((tithe) => {
                    const titheData = tithe
                    const memberData = tithe.member
                    delete titheData.member
                    const newData = Object.assign(titheData, memberData)
                    updatedData.push(newData)
                })

                isMounted && setTithes(updatedData)
            } catch(err) {
                console.log(err)
            }
        }

        getTitheData()

        return () => {
            isMounted = false;
            controller.abort()
        }

    }, [])

    console.log(tithes)

    const TableSkeleton = () => (
        <tr key={Math.random()*10}>
            <td key={1}>{"."}</td>
            <td key={2}>{"."}</td>
            <td key={3}>{"."}</td>
            <td key={4}>{"."}</td>
            <td key={5}>{"."}</td>
        </tr>
    )

  return (
    <>
        <div className="table-responsive">
        { tithes && <CSVLink data={tithes} className='btn btn-primary my-3 btn-sm' filename={"tithes.csv"} target="_blank">Export to Excel</CSVLink>}
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                    <th key={1} scope="col">ID</th>
                    <th key={2} scope="col">Date</th>
                    <th key={3} scope="col">First Name</th>
                    <th key={4} scope="col">Last Name</th>
                    <th key={5} scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading ? tithes?.map((tithe, index) => (
                    index < count &&
                    <tr key={tithe.id}>
                        <td key={1}>{tithe.id}</td>
                        <td key={2}>{tithe.date}</td>
                        <td key={3}>{tithe.firstName}</td>
                        <td key={4}>{tithe.lastName}</td>
                        <td key={5}>$ {tithe.amount}</td>
                        <td key={6}><Link className='btn btn-primary btn-sm' to={`/tithe/${tithe.id}`}>Edit</Link><button className="btn btn-danger btn-sm ms-sm-1" data-bs-toggle="modal" data-bs-target="#deleteTitheModal">Delete</button></td>
                    </tr>
                )) :
                    Array(count).fill(<TableSkeleton/>)
                }
            </tbody>
            </table>
        </div>
    </>
  )
}

export default Tithes