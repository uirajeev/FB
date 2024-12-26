import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import fetchData from '../../helpers/fetchData';
import BaseCard from '../baseCard';
import LoginInut from '../form/login';
import InlineLoader from '../inlineLoader';

import './style.scss';

const SearchAccount = ({
  logout,
  setUserInfo,
  setStep
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = Yup.object({
    email: Yup.string()
      .email(t('login.emailinvalid'))
      .required(t('login.emailRequire')),
  });

  const handleSearch = async (values) => {
    setLoading(true);
    setError('');
    const { success, data, error } = await fetchData('/user/finduser', 'POST', {
      email: values.email,
    });
    if (success) {
      setUserInfo(data);
      setStep(1);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className='search__content'>
      <BaseCard>
        <div className='search__content__title'>
          <h3>{t('reset.header')}</h3>
          <hr className='splitter' />
          <p>{t('reset.subheader')}</p>
        </div>

        <div className='search__content__form'>
          <Formik
            enableReinitialize
            initialValues={{ email: '' }}
            validationSchema={validateEmail}
            onSubmit={handleSearch}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type='text'
                  name='email'
                  placeholder={t('reset.email')}
                  formik={formik}
                />
                <InlineLoader loading={loading} error={error} />
                <hr className='splitter' />
                <div className='search__content__form__buttons'>
                  <button className='btn btn-gray' onClick={logout}>
                    {t('reset.cancle')}
                  </button>
                  <button type='submit' className='btn btn-blue'>{t('reset.search')}</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </BaseCard>
    </div>
  );
};

export default SearchAccount;
