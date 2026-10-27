import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
    const user = props.user;

    if (!user) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet/>
    }
};

export default ProtectedRoutes;