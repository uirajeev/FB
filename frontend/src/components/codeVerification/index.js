import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import fetchData from '../../helpers/fetchData';
import BaseCard from '../baseCard';
import LoginInut from '../form/login';
import InlineLoader from '../inlineLoader';

import './style.scss';

const CodeVerification = ({ user, setStep }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goBack = () => {
    setStep(0);
  };

  const verifyCode = async (values) => {
    setLoading(true);
    setError('');
    const { success, error } = await fetchData('/user/verifycode', 'POST', {
      code: values.code,
      email: user.email,
    });
    if (success) {
      setStep(3);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  const validateCode = Yup.object({
    code: Yup.string()
      .required(t('reset.codeRequire'))
      .min(5, t('reset.codeLength'))
      .max(5, t('reset.codeLength')),
  });

  return (
    <div className='reset__content'>
      <BaseCard>
        <div className='reset__content__title'>
          <h3>{t('reset.codeVerify')}</h3>
          <hr className='splitter' />
          <p>{t('reset.codeSubTitle')}</p>
        </div>

        <div className='search__content__form'>
          <Formik
            enableReinitialize
            initialValues={{ code: '' }}
            validationSchema={validateCode}
            onSubmit={verifyCode}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type='text'
                  name='code'
                  placeholder={t('reset.code')}
                  formik={formik}
                />
                <InlineLoader loading={loading} error={error} />
                <hr className='splitter' />
                <div className='search__content__form__buttons'>
                  <button className='btn btn-gray' onClick={goBack}>
                    {t('reset.cancle')}
                  </button>
                  <button type='submit' className='btn btn-blue'>
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

export default CodeVerification;
