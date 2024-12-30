import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import Reset from './pages/reset';
import ActivateAccount from './pages/home/activateAccount';
import './App.scss';
import LoggedinRoutes from './routes/LoggedinRoutes';
import NotLoggedinRoutes from './routes/NotLoggedinRoutes';
import CreatPostModal from './components/creatPostModal';

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && <CreatPostModal setVisible={setVisible} />}
      <Routes>
        <Route element={<NotLoggedinRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route element={<LoggedinRoutes />}>
          <Route path='/profile' element={<Profile />} exact />
          <Route path='/' element={<Home setVisible={setVisible} />} exact />
          <Route path='/activate/:token' element={<ActivateAccount />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} exact />
      </Routes>
    </>
  );
}

export default App;
