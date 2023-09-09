import LoginFooter from '../../components/login/LoginFooter';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';

import './style.scss';

const Login = () => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <LoginForm />
        <RegisterForm />
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;
