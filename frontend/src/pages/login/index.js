import { useState } from 'react';

import LoginFooter from '../../components/login/LoginFooter';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';

import './style.scss';

const Login = () => {
  const [register, setRegister] = useState(false);
  return (
    <div className="login">
      <div className="login-wrapper">
        <LoginForm setRegister={setRegister} />
        {register && <RegisterForm setRegister={setRegister} />}
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;
