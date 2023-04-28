import React from 'react'
import MembersList from './MembersList'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div>

            <Header/>
            <Sidebar/>
            <Outlet/>
    </div>
  )
}

export default Home