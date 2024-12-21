import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterInut from '../form/register';
import DateSelector from '../form/register/DateSelector';
import GenderSelector from '../form/register/GenderSelector';

import './registerForm.scss';

const RegisterForm = ({ setRegister }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = Yup.object({
    first_name: Yup.string()
      .required(t('signup.firstnameRequire'))
      .min(2, t('signup.firstnameMin'))
      .max(32, t('signup.firstnameMax'))
      .matches(/^[A-Za-z\s]+$/, t('signup.firstnameInvalide')),
    last_name: Yup.string()
      .required(t('signup.lastnameRequire'))
      .min(2, t('signup.lastnameMin'))
      .max(32, t('signup.lastnameMax'))
      .matches(/^[A-Za-z\s]+$/, t('signup.lastnameInvalide')),
    email: Yup.string()
      .required(t('signup.emailRequire'))
      .email(t('signup.emailinvalid')),
    password: Yup.string()
      .required(t('signup.passwordRequire'))
      .min(8, t('signup.passwordMin'))
      .max(32, t('signup.passwordMax')),
  });

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = ({
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  }) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      })
      .then(function ({ data }) {
        setLoading(false);
        setError('');
        const { message, ...rest } = data;
        setSuccess(message);
        setTimeout(() => {
          dispatch(login(rest));
          Cookies.set('user', JSON.stringify(rest));
          navigate('/');
        }, 2000);
      })
      .catch(function (error) {
        setLoading(false);
        setSuccess('');
        setError(error.response.data.message || error.message);
      });
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register-header">
          <i className="exit_icon" onClick={() => setRegister(false)}></i>
          <h3>{t('signup.header')}</h3>
          <span>{t('signup.subheader')}</span>
        </div>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            bYear: new Date().getFullYear(),
            bMonth: new Date().getMonth() + 1,
            bDay: new Date().getDate(),
            gender: '',
          }}
          validationSchema={validation}
          onSubmit={(data) => {
            const { bYear, bMonth, bDay, gender } = data;
            const currentDate = new Date();
            const selectedDate = new Date(bYear, bMonth - 1, bDay);
            const minDate = new Date(1970 + 18, 0, 1);
            if (currentDate - selectedDate < minDate) {
              setDateError(t('signup.dateError'));
            } else if (gender === '') {
              setGenderError(t('signup.genderError'));
            } else {
              setDateError('');
              setGenderError('');
              setError('');
              setSuccess('');
              registerSubmit(data);
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form className="register-form">
              <div className="register-row">
                <RegisterInut
                  type="text"
                  placeholder={t('signup.firstname')}
                  name="first_name"
                />
                <RegisterInut
                  type="text"
                  placeholder={t('signup.lastname')}
                  name="last_name"
                />
              </div>
              <div className="register-row">
                <RegisterInut
                  type="text"
                  placeholder={t('signup.email')}
                  name="email"
                />
              </div>
              <div className="register-row">
                <RegisterInut
                  type="password"
                  placeholder={t('signup.password')}
                  name="password"
                />
              </div>
              <div className="register-col">
                <div className="register-col-header">
                  {t('signup.birthLabel')} <i className="info_icon"></i>
                </div>
                <DateSelector
                  values={values}
                  handleChange={handleChange}
                  dateError={dateError}
                />
              </div>
              <div className="register-col">
                <div className="register-col-header">
                  {t('signup.gender')} <i className="info_icon"></i>
                </div>
                <GenderSelector
                  genderError={genderError}
                  handleChange={handleChange}
                />
              </div>
              <div className="register-info">
                <Trans i18nKey="signup.textContactInfo">
                  <p>
                    description
                    <Link to="/">Link</Link>
                  </p>
                </Trans>
                <Trans i18nKey="signup.terms">
                  <p>
                    By clicking Sign Up, you agree to our{' '}
                    <Link to="/">Terms</Link>,{' '}
                    <Link to="/">Privacy Policy</Link> and{' '}
                    <Link to="/">Cookies Policy</Link>. You may receive SMS
                    notifications from us and can opt out at any time.
                  </p>
                </Trans>
              </div>
              <div className="register-btn">
                <button type="submit" className="btn btn-green">
                  {t('signup.header')}
                </button>
              </div>

              {error && <div className="error-text text-center">{error}</div>}
              {success && (
                <div className="success-text text-center">{success}</div>
              )}
              <DotLoader color="#1876f2" size={30} loading={loading} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
