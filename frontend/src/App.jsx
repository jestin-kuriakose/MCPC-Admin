import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import './App.css'

const Dashboard = React.lazy( () => import("./components/Dashboard"))
const SingleMember = React.lazy( () => import("./components/SingleMember"))
const NewMember = React.lazy( () => import("./components/NewMember"))
const NewTithe = React.lazy( () => import("./components/NewTithe"))
const Tithe = React.lazy( () => import("./components/Tithe"))
const TitheList = React.lazy( () => import("./pages/TitheList"))
const ErrorPage = React.lazy( () => import("./pages/ErrorPage"))
const Home = React.lazy( () => import("./pages/Home"))
const PDFView = React.lazy( () => import("./pages/PDFView"))
const Login = React.lazy( () => import("./pages/Login"))
const MembersList = React.lazy(()=>import("./pages/MembersList"))
import Loading from './components/Loading';
import Reports from "./pages/reports/Reports";
import PDFDownload from "./pages/PDFDownload";
import DonationSlip from "./pages/reports/DonationSlip";
import ReportsDashboard from "./pages/reports/ReportsDashboard";
import TitheReports from "./pages/reports/TitheReports";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<Loading/>}><Home/></Suspense>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Suspense fallback={<Loading/>}><Dashboard/></Suspense>
        },
        {
          path: "members",
          element: <Suspense fallback={<Loading/>}><MembersList/></Suspense>
        },
        {
          path: "member/:memberId",
          element: <Suspense fallback={<Loading/>}><SingleMember/></Suspense>
        },
        {
          path: "newMember",
          element: <Suspense fallback={<Loading/>}><NewMember/></Suspense>
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
    {
      path:"pdfView",
      element: <Suspense fallback={<Loading/>}><PDFView/></Suspense>
    },
    {
      path:"pdfDownload",
      element: <Suspense fallback={<Loading/>}><PDFDownload/></Suspense>
    },
    {
      path: "login",
      element: <Suspense fallback={<Loading/>}><Login/></Suspense>
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
