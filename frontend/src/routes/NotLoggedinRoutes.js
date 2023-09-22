import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../pages/login';

const NotLoggedinRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/" /> : <Login />;
};

export default NotLoggedinRoutes;
