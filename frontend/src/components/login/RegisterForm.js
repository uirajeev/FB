import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import RegisterInut from '../form/register';
import DateSelector from '../form/register/DateSelector';
import GenderSelector from '../form/register/GenderSelector';

import './registerForm.scss';

const userInfo = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: '',
};

const RegisterForm = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(userInfo);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const fullYear = new Date().getFullYear();
  const bYears = Array.from(new Array(100), (val, index) => fullYear - index);
  const bMonths = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => index + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

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
      .min(6, t('signup.passwordMin'))
      .max(32, t('signup.passwordMax')),
  });

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
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
        console.log(data);
        setError('');
        setSuccess(data.message);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        setError(t(error.response.data.message));
        setSuccess(t(''));
      });
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register-header">
          <i className="exit_icon"></i>
          <h3>{t('signup.header')}</h3>
          <span>{t('signup.subheader')}</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={validation}
          onSubmit={() => {
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
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register-form">
              <div className="register-row">
                <RegisterInut
                  type="text"
                  placeholder={t('signup.firstname')}
                  name="first_name"
                  onChange={handleChange}
                />
                <RegisterInut
                  type="text"
                  placeholder={t('signup.lastname')}
                  name="last_name"
                  onChange={handleChange}
                />
              </div>
              <div className="register-row">
                <RegisterInut
                  type="text"
                  placeholder={t('signup.email')}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="register-row">
                <RegisterInut
                  type="password"
                  placeholder={t('signup.password')}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="register-col">
                <div className="register-col-header">
                  {t('signup.birthLabel')} <i className="info_icon"></i>
                </div>
                <DateSelector
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  bMonths={bMonths}
                  bYears={bYears}
                  handleChange={handleChange}
                  dateError={dateError}
                />
              </div>
              <div className="register-col">
                <div className="register-col-header">
                  {t('signup.gender')} <i className="info_icon"></i>
                </div>
                <GenderSelector
                  handleChange={handleChange}
                  genderError={genderError}
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

              <div className="error-text">{error}</div>
              <div className="success-text">{success}</div>
              <DotLoader color="#1876f2" size={30} loading={loading} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
