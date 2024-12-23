import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { createSelector } from 'reselect';
import Login from '../pages/login';

const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

const LoggedinRoutes = () => {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Login />;
};

export default LoggedinRoutes;
