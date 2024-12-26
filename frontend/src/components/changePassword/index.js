import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import fetchData from '../../helpers/fetchData';
import BaseCard from '../baseCard';
import LoginInut from '../form/login';
import InlineLoader from '../inlineLoader';

import './style.scss';

const ChangePassword = ({ user, logout }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetPassword = async (values) => {
    setLoading(true);
    setError('');
    const { success, error } = await fetchData('/user/resetpassword', 'POST', {
      email: user.email,
      password: values.password,
    });
    if (success) {
      logout();
    } else {
      setError(error);
    }
    setLoading(false);
  };

  const validatePassword = Yup.object({
    password: Yup.string()
      .required(t('signup.passwordRequire'))
      .min(8, t('signup.passwordMin'))
      .max(32, t('signup.passwordMax')),
    confirmPassword: Yup.string()
      .required(t('reset.confirmPassword'))
      .oneOf([Yup.ref('password')], t('reset.passwordMatch')),
  });

  return (
    <div className='search__content'>
      <BaseCard>
        <div className='search__content__title'>
          <h3>{t('reset.passwordTitle')}</h3>
          <hr className='splitter' />
          <p>{t('reset.passwordSubTitle')}</p>
        </div>

        <div className='search__content__form'>
          <Formik
            enableReinitialize
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validatePassword}
            onSubmit={resetPassword}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type='password'
                  name='password'
                  placeholder={t('reset.password')}
                  formik={formik}
                />
                <LoginInut
                  type='password'
                  name='confirmPassword'
                  placeholder={t('reset.confirmPassword')}
                  formik={formik}
                />
                <InlineLoader error={error} loading={loading} />
                <hr className='splitter' />
                <div className='search__content__form__buttons'>
                  <button className='btn btn-gray' onClick={logout}>
                    {t('reset.cancle')}
                  </button>
                  <button className='btn btn-blue' type='submit'>
                    {t('reset.continue')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </BaseCard>
    </div>
  );
};

export default ChangePassword;
