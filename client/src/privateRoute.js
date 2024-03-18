import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    const authToken = localStorage.getItem('authToken');
return (
    authToken ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;