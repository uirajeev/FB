import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch } from 'react-redux';
import DotLoader from 'react-spinners/DotLoader';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import axios from 'axios';
import * as Yup from 'yup';
import { login } from '../../store/slices/userSlice';

import LoginInut from '../form/login';
import './loginForm.scss';

const LoginForm = ({ setRegister }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginValidation = Yup.object({
    email: Yup.string()
      .email(t('login.emailinvalid'))
      .required(t('login.emailRequire')),
    password: Yup.string()
      .required(t('login.passwordRequire'))
      .min(8, t('login.passwordMin'))
      .max(32, t('login.passwordMax')),
  });

  const loginUser = ({ email, password }) => {
    setLoading(true);
    setError('');
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        setLoading(false);
        setError('');
        dispatch(login(data));
        Cookies.set('user', JSON.stringify(data));
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message || error.message);
      });
  };
  return (
    <div className="login-wrap">
      <div className="login-text">
        <img src="../../icons/facebook.svg" alt="" />
        <span>{t('login.message')}</span>
      </div>
      <div className="login-form">
        <div className="login-form-wrap">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidation}
            onSubmit={(data) => {
              loginUser(data);
            }}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type="text"
                  name="email"
                  placeholder={t('login.emailPlaceholder')}
                />
                <LoginInut
                  type="password"
                  name="password"
                  bottom
                  placeholder={t('login.passwordPlaceholder')}
                />
                <button className="btn btn-blue" type="submit">
                  {t('login.loginButton')}
                </button>
              </Form>
            )}
          </Formik>
          <Link className="forgot-password" to="/forgot">
            {t('login.forgotLabel')}
          </Link>
          <div className="error-text text-center">{error}</div>
          <DotLoader color="#1876f2" size={30} loading={loading} />
          <hr className="sign-splitter" />
          <button
            type="button"
            className="btn btn-green open-signup"
            onClick={() => setRegister(true)}
          >
            {t('login.createAccount')}
          </button>
        </div>
        <Link to="/" className="sing-extra">
          <Trans i18nKey="login.createPage"></Trans>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;