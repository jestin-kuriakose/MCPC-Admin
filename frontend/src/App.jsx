import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import './App.css'

const Dashboard = React.lazy( () => import("./components/Dashboard"))

const NewMember = React.lazy( () => import("./components/NewMember"))

const NewTithe = React.lazy( () => import("./components/NewTithe"))
const Tithe = React.lazy( () => import("./components/Tithe"))
const TitheList = React.lazy( () => import("./pages/TitheList"))
const ErrorPage = React.lazy( () => import("./pages/ErrorPage"))
const Home = React.lazy( () => import("./pages/Home"))
const PDFView = React.lazy( () => import("./pages/PDFView"))
const Login = React.lazy( () => import("./pages/Login"))
const Reports = React.lazy(()=>import("./pages/reports/Reports"))
const PDFDownload = React.lazy(()=>import("./pages/PDFDownload"))
const DonationSlip = React.lazy(()=>import("./pages/reports/DonationSlip"))
const ReportsDashboard = React.lazy(()=>import("./pages/reports/ReportsDashboard"))
const TitheReports = React.lazy(()=>import("./pages/reports/TitheReports"))

import Loading from './components/Loading';
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import WeeklyTithe from "./components/WeeklyTithe";
import SingleMember from "./components/SingleMember";
import MembersList from "./pages/MembersList"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<Loading/>}><Layout/></Suspense>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "login",
          element: <Suspense fallback={<Loading/>}><Login/></Suspense>
        },
        {
          element: <PersistLogin/>,
          children: [
            {
              element: <RequireAuth/>,
              children: [
                {
                  path: "/",
                  element: <Suspense fallback={<Loading/>}><Home/></Suspense>,
                  children: [
                    {
                      index: true,
                      element: <Suspense fallback={<Loading/>}><Dashboard/></Suspense>
                    },
                    {
                      path: "members",
                      element: <MembersList/>
                    },
                    {
                      path: "member/:memberId",
                      element: <SingleMember/>,
                    },
                    {
                      element: <Suspense fallback={<Loading/>}><NewMember/></Suspense>,
                      path:'newMember',
                    },
                    {
                      path: "tithes",
                      element: <Suspense fallback={<Loading/>}><TitheList/></Suspense>
                    },
                    {
                      path: "tithe/:titheId",
                      element: <Suspense fallback={<Loading/>}><Tithe/></Suspense>
                    },
                    {
                      path: "newTithe",
                      element: <Suspense fallback={<Loading/>}><NewTithe/></Suspense>
                    },
                    {
                      path: "weeklyTithe",
                      element: <Suspense fallback={<Loading/>}><WeeklyTithe/></Suspense>
                    },
                  ]
                },
    
                {
                  path: "reports",
                  element: <Suspense fallback={<Loading/>}><Reports/></Suspense>,
                  errorElement: <ErrorPage/>,
                  children: [
                    {
                      path: "/reports",
                      element: <Suspense fallback={<Loading/>}><ReportsDashboard/></Suspense>
                    },
                    {
                      path: "donationSlips",
                      element: <Suspense fallback={<Loading/>}><DonationSlip/></Suspense>
                    },
                    {
                      path: "titheReports",
                      element: <Suspense fallback={<Loading/>}><TitheReports/></Suspense>
                    }
                  ]
                },
    
              ]
            },
            
          ]
        },


          {
            path:"pdfView",
            element: <Suspense fallback={<Loading/>}><PDFView/></Suspense>
          },
          {
            path:"pdfDownload",
            element: <Suspense fallback={<Loading/>}><PDFDownload/></Suspense>
          },
        
      ]},
        
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
