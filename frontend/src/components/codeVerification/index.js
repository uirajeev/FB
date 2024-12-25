import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import BaseCard from '../baseCard';
import LoginInut from '../form/login';

import './style.scss';

const CodeVerification = ({ code, setCode, error, setStep }) => {
  const { t } = useTranslation();
  const goBack = () => {
    setStep(0);
  };
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
            initialValues={{ code }}
            onSubmit={(values) => console.log(values)}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type='text'
                  name='code'
                  placeholder={t('reset.code')}
                  onChange={(e) => setCode(e.target.value)}
                />
                {error && <p className='error-text'>{error}</p>}
                <hr className='splitter' />
                <div className='search__content__form__buttons'>
                  <button className='btn btn-gray' onClick={goBack}>
                    {t('reset.cancle')}
                  </button>
                  <button className='btn btn-blue'>{t('reset.continue')}</button>
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
