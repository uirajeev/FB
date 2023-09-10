import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';
import * as Yup from 'yup';

import LoginInut from '../form/login';
import './loginForm.scss';

const loginForm = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState(loginForm);
  const { email, password } = login;

  const heandleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .email(t('login.emailinvalid'))
      .required(t('login.emailRequire')),
    password: Yup.string()
      .required(t('login.passwordRequire'))
      .min(6, t('login.passwordMin'))
      .max(32, t('login.passwordMax')),
  });
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
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type="text"
                  name="email"
                  placeholder={t('login.emailPlaceholder')}
                  onChange={heandleChange}
                />
                <LoginInut
                  type="password"
                  name="password"
                  bottom
                  placeholder={t('login.passwordPlaceholder')}
                  onChange={heandleChange}
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
          <hr className="sign-splitter" />
          <button className="btn btn-green open-signup">
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
