import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
    const isLoggedIn = props.isLoggedIn;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet/>
    }
};

export default ProtectedRoutes;