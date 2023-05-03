import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Reports = () => {

  return (
    <>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default Reports