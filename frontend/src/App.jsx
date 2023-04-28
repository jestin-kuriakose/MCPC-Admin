import './App.css'
import Dashboard from './components/Dashboard';
import SingleMember from './components/SingleMember';
import MembersList from './pages/MembersList';
import NewMember from './components/NewMember';
import NewTithe from './components/NewTithe';
import Tithe from './components/Tithe';
import TitheList from './pages/TitheList';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PDFView from './pages/PDFView';
import Loading from './components/Loading';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Dashboard/>
        },
        {
          path: "members",
          element: <MembersList/>
        },
        {
          path: "member/:memberId",
          element: <SingleMember/>
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
        {
          path:"test",
          element: <Loading/>
        }

      ]
    },
    {
      path:"pdfView",
      element: <PDFView/>
    },
    {
      path: "login",
      element: <Login/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
