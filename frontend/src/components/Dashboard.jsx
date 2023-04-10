import React from 'react'
import Sidebar from './Sidebar'
import MembersList from './MembersList'
import TitheList from './TitheList'

const Dashboard = () => {
  return (
    <>
        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <h1 className='text-center py-2'>Dashboard</h1>
        </div>

        <MembersList/>
        <TitheList/>
    </>
  )
}

export default Dashboard