import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import BaseCard from '../baseCard';
import LoginInut from '../form/login';

import './style.scss';

const SearchAccount = ({ email, setEmail, error, logout }) => {
    const { t } = useTranslation();
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
            initialValues={{ email }}
            onSubmit={(values) => console.log(values)}
          >
            {(formik) => (
              <Form>
                <LoginInut
                  type='text'
                  name='email'
                  placeholder={t('reset.email')}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className='error-text'>{error}</p>}
                <hr className='splitter' />
                <div className='search__content__form__buttons'>
                  <button className='btn btn-gray' onClick={logout}>
                    {t('reset.cancle')}
                  </button>
                  <button className='btn btn-blue'>{t('reset.search')}</button>
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
