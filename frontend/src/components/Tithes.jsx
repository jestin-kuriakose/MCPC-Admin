import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import baseURL from "../http.js"
import { useDataFetch } from '../hooks/use-datafetch.js'
import { useQuery } from '@tanstack/react-query'
import { fetchMembers, fetchTithes } from '../apiCalls.js'
import { CSVLink } from 'react-csv'

const Tithes = ({count}) => {

    const [members, setMembers] = useState([])
    const [tithes, setTithes] = useState([])

    const memberQuery = useQuery({
        queryKey: ["members"],
        queryFn: fetchMembers
    })
    const titheQuery = useQuery({
        queryKey: ["tithes"],
        queryFn: fetchTithes
    })

    useEffect(()=> {
        setMembers(memberQuery.data?.data)
        setTithes(titheQuery.data?.data)
    }, [memberQuery.data, titheQuery.data])

    const findMember = (tithe, query) => {
        const member = members?.find(member => member.id == tithe.member)
        if (query == "firstName"){
            return member?.firstName
        } else {
            return member?.lastName
        }  
    }

    const TableSkeleton = () => (
        <tr>
            <td>{"."}</td>
            <td>{"."}</td>
            <td>{"."}</td>
            <td>{"."}</td>
            <td>{"."}</td>
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
                {!titheQuery.isLoading ? tithes?.map((tithe, index) => (
                    index < count &&
                    <tr key={tithe.id}>
                        <td key={1}>{tithe.id}</td>
                        <td key={2}>{tithe.date}</td>
                        <td key={3}>{findMember(tithe, "firstName")}</td>
                        <td key={4}>{findMember(tithe, "lastName")}</td>
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