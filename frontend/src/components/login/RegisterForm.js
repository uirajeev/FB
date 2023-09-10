import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import RegisterInut from '../form/register';

import './registerForm.scss';

const RegisterForm = () => {
  const { t } = useTranslation();
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
    console.log(name, value);
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
    // bYear,
    // bMonth,
    // bDay,
    // gender,
  });

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
                <div className="register-grid">
                  <select name="bDay" value={bDay} onChange={handleChange}>
                    {days.map((day) => (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" value={bMonth} onChange={handleChange}>
                    {bMonths.map((month) => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" value={bYear} onChange={handleChange}>
                    {bYears.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="register-col">
                <div className="register-col-header">
                  {t('signup.gender')} <i className="info_icon"></i>
                </div>
                <div className="register-grid">
                  <label htmlFor="male">
                    {t('signup.male')}
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="femail">
                    {t('signup.femail')}
                    <input
                      type="radio"
                      name="gender"
                      id="femail"
                      value="femail"
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="other">
                    {t('signup.other')}
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
                <button className="btn btn-green">{t('signup.header')}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
