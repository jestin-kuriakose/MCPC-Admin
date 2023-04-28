import React from 'react'
import { Outlet } from 'react-router-dom'
const Header = React.lazy( () => import("../components/Header"))
const Sidebar = React.lazy( () => import("../components/Sidebar"))

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