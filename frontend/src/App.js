import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import './App.scss';
import LoggedinRoutes from './routes/LoggedinRoutes';
import NotLoggedinRoutes from './routes/NotLoggedinRoutes';
import ActivateAccount from './pages/home/activateAccount';

function App() {
  return (
    <Routes>
      <Route element={<NotLoggedinRoutes />}>
        <Route path="/login" element={<Login />} exact />
      </Route>
      <Route element={<LoggedinRoutes />}>
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/" element={<Home />} exact />
        <Route path="/activate/:token" element={<ActivateAccount />} exact />
      </Route>
    </Routes>
  );
}

export default App;
