import './App.css'
import Dashboard from './components/Dashboard';
import Member from './components/Member';
import MembersList from './components/MembersList';
import NewMember from './components/NewMember';
import NewTithe from './components/NewTithe';
import Tithe from './components/Tithe';
import TitheList from './components/TitheList';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PDFView from './pages/PDFView';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard/>
        },
        {
          path: "members",
          element: <MembersList/>
        },
        {
          path: "member/:memberId",
          element: <Member/>
        },
        {
          path: "newMember",
          element: <NewMember/>
        },
        {
          path: "tithes",
          element: <TitheList/>
        },
        {
          path: "tithe/:titheId",
          element: <Tithe/>
        },
        {
          path: "newTithe",
          element: <NewTithe/>
        },

      ]
    },
    {
      path:"pdfView",
      element: <PDFView/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
