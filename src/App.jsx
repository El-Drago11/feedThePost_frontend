import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './Pages/Dashboard'
import MyProfile from './components/Dashboard/MyProfile'
import MyFeed from './Pages/userPages/MyFeed'
import FeedThePost from './Pages/FeedThePost'
import { useSelector } from 'react-redux'
import LoadindScreen from './common/LoaderScreen'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import RegisterUsers from './Pages/admin/RegisterUsers'

function App() {

  const { loading } = useSelector((store) => store.auth)

  return (
    <div className='w-screen min-h-screen bg-black flex flex-col font-inter'>
      <Routes>
        <Route path='/Signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }>
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/Post' element={<FeedThePost />} />
          <Route path='dashboard/myPost' element={<MyFeed />} />
        </Route>
        <Route element={
          <AdminPrivateRoute>
            <DashBoard />
          </AdminPrivateRoute>
        }>
          <Route path='admin/my-profile' element={<MyProfile />} />
          <Route path='admin/Feeds' element={<FeedThePost />} />
          <Route path='admin/Users' element={<RegisterUsers />} />
        </Route>
      </Routes>
      {
        (loading) && <LoadindScreen />
      }
    </div>
  )
}

export default App
